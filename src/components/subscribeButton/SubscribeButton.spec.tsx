import { render, screen, fireEvent} from '@testing-library/react'
import { signIn, useSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'
import {useRouter} from 'next/router'
import {SubscribeButton} from '.'



jest.mock('next-auth/client');

jest.mock('next/router')

describe('Test SubscribeButton', () => {
  it('renders correctly', ()=> { 
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])
    
    render(<SubscribeButton />)
    expect(screen.getByText('Subscribe Now')).toBeInTheDocument()
  })

  it('redirect User to signin when not authenticated', () => {
    const signInMocked = mocked(signIn)

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])
    render(<SubscribeButton />)

    const subscribeButton =   screen.getByText('Subscribe Now')
    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })
  
  it('Redirects to Posts when user alredy has subscription', () => {
    const useRouterMocked =  mocked(useRouter)
    const useSessioMocked = mocked(useSession) 
    const pushMock = jest.fn()

    useSessioMocked.mockReturnValueOnce([
      {
        user: 
          {
            name: 'Jhon Doe', 
            email: 'jhon@jhon.com'
          },
          activeSubscription: 'fake-active',
          expires: 'fake-test'
      },
      false
    ])

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    }as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe Now')

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith('/post')
  })
})