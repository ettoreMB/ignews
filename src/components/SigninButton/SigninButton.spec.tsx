import { render, screen} from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'
import {SigninButton} from '.'



jest.mock('next-auth/client');

describe('Test SigninButton', ()=> {
  it('renders when user is not authenticated', ()=> {
    const  useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SigninButton />)
    expect(screen.getByText('Sign in With Github')).toBeInTheDocument()
  })

  it('renders when user is authenticated', ()=> {
    const  useSessionMocked = mocked(useSession)

      useSessionMocked.mockReturnValueOnce([
      {user: {name: 'Jhon Doe', email: 'jhon@jhon.com'}, expires: 'fake-test'}, false
    ]
    )
    render(<SigninButton />)
    expect(screen.getByText('Jhon Doe')).toBeInTheDocument()
  })
})