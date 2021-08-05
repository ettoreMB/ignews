import { GetStaticProps} from 'next'
import Head from 'next/head'
import styles from './home.module.scss'
import {SubscribeButton} from '../components/subscribeButton/index'
import { stripe } from '../services/stripe'

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home({product}) {
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
    
    
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>New Abou the <span>React World</span></h1>
        <p>
          Get access to all publications <br/>
          <span>{product.amount}</span>
        </p>

        <SubscribeButton />
      </section>

      <img src="/images/avatar.svg" alt="Coding Girl"/>
    </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async() => {
    const price = await stripe.prices.retrieve('price_1IhdefJrLwWhhvuxmAjoNBIJ', {
      expand: ['product']
    })
      const product = {
        priceId: price.id,
        amount: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100)

      }
    
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, 
  }
}