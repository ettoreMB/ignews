import { render, screen} from '@testing-library/react';
import Posts, { getStaticProps } from '../../pages/posts';
import { mocked } from 'ts-jest/utils'
import {getPrismicClient} from '../../services/prismic'


const posts = [{
  slug: 'New Post', title: 'Post Title', excerpt: 'Post Exerpt', updatedAt: 'July 20'
}]

jest.mock('../../services/prismic.ts')
describe('Test PostsPages', () => {
  it('renders correctly PostPage', ()=> { 
    
    
    render(<Posts posts={posts} />)

    expect(screen.getByText('New Post')).toBeInTheDocument()
  });

  it('loads initial data', async () => {
    const getPrimisClinetMocked = mocked(getPrismicClient)

    getPrimisClinetMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results : [
          {
            uid: 'New Post',
            data: {
              title: [
                { type: 'heading', text: 'New Post'}
              ],
              content: [
                { type : 'paragraph', text: 'Post Exerpt'}
              ],
            },
            last_publication_date: '20-07-2021',
          }
        ]
      })
    }as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'New Post',
            title: 'New Post',
            excerpt: 'Post Exerpt',
            updatedAt: 'July 20'
          }]
        }
      })
    )
  });
})  