import Head from 'next/head'

import { Container } from '@/styles/pages'
import { Form } from '@/components/form'

export const Index = (): JSX.Element => (
  <>
    <Head>
      <title>Gerar ficha de castração</title>
    </Head>

    <Container className="container">
      <header>
        <h1>Gerar ficha de castração</h1>
      </header>
      <main>
        <Form />
      </main>
    </Container>
  </>
)

export default Index
