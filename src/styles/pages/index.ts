import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-rows: 100px auto;

  header {
    text-align: center;

    h1 {
      margin: 2rem 0 1rem 0;

      @media screen and (max-width: 360px) {
        font-size: 1.5rem;
      }
    }
  }

  main {
    display: grid;
    place-items: center;
  }
`
