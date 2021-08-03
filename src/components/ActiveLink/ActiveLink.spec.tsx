import {render} from '@testing-library/react'
import { ActiveLink } from '.'

test('aciveLink renders correctly', () => {
  const {debug} = render(
    <ActiveLink href='/' activeClassName='active'>
      <a>Home</a>
    </ActiveLink>
  )

  debug ()
})