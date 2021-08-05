import { render, screen} from '@testing-library/react';
import Posts, { getStaticPaths, getStaticProps} from '../../pages/posts/preview/[slug]';
import { mocked } from 'ts-jest/utils'
import {getPrismicClient} from '../../services/prismic'
import { useSession } from 'next-auth/client';
import { route } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router';


const post = {
  slug: 'NewPost', title: 'Post Title', content: '<h1>Post Exerpt</h1>', updatedAt: '10 de abril'
}

jest.mock('next-auth/client')
jest.mock('../../services/prismic.ts')
jest.mock('next/router')



describe('Test PostsPages', () => {
  it('renders correctly', ()=> { 

    const useSessioMocked = mocked(useSession)
    useSessioMocked.mockReturnValueOnce([null, false])

    render(<Posts post={post} />)

    expect(screen.getByText('New Post')).toBeInTheDocument()
    expect(screen.getByText('Post Exerpt')).toBeInTheDocument()
    expect(screen.getByText('Wanna Continue Reading?')).toBeInTheDocument()


  });

  it('redirects user to post if user is subscribed', async () => {
    
    const useSessionMocked = mocked(useSession)
    const useRouterPushMocked =  mocked(useRouter)
    const pushMock = jest.fn()


    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake_actice_subscription'}, false
    ] as any)

    useRouterPushMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)

    render(<Posts post={post} />)

    expect(pushMock).toHaveBeenCalledWith('/post/NewPost')

  });

  it('loads inital data',async () => {
    
    const getPrismicClientMocked = mocked(getPrismicClient)

    
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
  

  

  const response = await getStaticProps({
    params: {
      slug: 'NewPost'
    }
  })

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