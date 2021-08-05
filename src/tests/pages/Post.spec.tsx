import { render, screen} from '@testing-library/react';
import Posts, { getServerSideProps } from '../../pages/posts/[slug]';
import { mocked } from 'ts-jest/utils'
import {getPrismicClient} from '../../services/prismic'
import { getSession } from 'next-auth/client';


const post = {
  slug: 'New Post', title: 'Post Title', content: '<h1>Post Exerpt</h1>', updatedAt: 'April 01'
}

jest.mock('next-auth/client')
jest.mock('../../services/prismic.ts')
describe('Test PostsPages', () => {
  it('renders correctly', ()=> { 
    
    
    render(<Posts post={post} />)

    expect(screen.getByText('New Post')).toBeInTheDocument()
    expect(screen.getByText('Post Exerpt')).toBeInTheDocument()

  });

  it('redirects if has not subscription', async () => {
    
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce(null)

    
    const response = await getServerSideProps(
      { params: { slug : 'My New Post'}} as any )

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
         })
      })
    )
  });

  it('loads inital data',async () => {
    
    const getPrismicClientMocked = mocked(getPrismicClient)
    const getSessionMocked = mocked(getSession)
    
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockReturnValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'New Post'}
          ],
          content: [
            { type : 'paragraph', text: 'Post content'}
          ],
        },
        last_publication_date: '04-01-2021'
      })
    } as any) 
  

  getSessionMocked.mockResolvedValueOnce({
    activeSubscription: 'fake-activeSubscription'
  }as any);

  const response = await getServerSideProps(
    { params: { slug : 'My New Post'}} as any )

  expect(response).toEqual(
    expect.objectContaining({
      props: {
        post: {
          slug: 'My New Post',
          title: 'New Post',
          constent: '<p>Post content</p>',
          updated_at: '01 de abril 2021'
        }
      }
    })
  )
  });
})  