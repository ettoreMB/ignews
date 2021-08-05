// import { render, screen} from '@testing-library/react';
// import Home, { getStaticProps } from '../../pages';
// import { mocked } from 'ts-jest/utils'
// import { stripe } from '../../services/stripe'
// jest.mock('../../services/stripe')

// jest.mock('next/router')

// jest.mock('next-auth/client', () => {
//   return {
//     useSession: () => [null, false]
//   }
// })


// describe('Test HomePage', () => {
//   it('renders correctly', ()=> { 
    
    
//     render(<Home product={{priceId:'fake-price-id', amount: 'R$50,00'}}/>)

//     expect(screen.getByText('R$50,00')).toBeInTheDocument()
//   });

//   it('loads initial dara', async () => {
//     const retrivePricesStripeMocked = mocked(stripe.prices.retrieve)

//     retrivePricesStripeMocked.mockResolvedValueOnce({
//       id: 'fake-price-id',
//       unit_amount: 5000,
//     }as any)

//     const response = await getStaticProps({})

//     expect(response).toEqual(
//       expect.objectContaining({
//         props: {
//           product: {
//             priceId: 'fake-price-id',
//             amount: 'R$ 50,00'
//           }
//         }
//       })
//     )
//   });
// })  