import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1000px;
  padding: 15px;
  border-radius: 10px;

  form {
    display: grid;
    grid-template-areas: 'image person animal';
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;

    .image {
      grid-area: 'image';
      grid-row: image;
      grid-column: image;

      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;

      input[type='file'] {
        display: none;
      }

      .imageBtn {
        width: 100%;
        height: 2.5rem;

        cursor: pointer;
        background: #4361ee;

        border: 2px solid transparent;
        border-radius: 10px;

        display: grid;
        place-items: center;

        color: #fff;
        font-size: 1.5rem;
      }

      .preview {
        width: 300px;
        height: 300px;

        margin: 0 auto;
        border: 1px solid #555;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .animal {
      grid-area: 'animal';
      grid-row: animal;

      width: 100%;

      display: flex;
      flex-direction: column;
    }

    .person {
      grid-area: 'person';
      grid-row: person;

      width: 100%;

      display: flex;
      flex-direction: column;
    }

    .boxes {
      display: flex;
      flex-direction: row;

      gap: 1rem;
    }

    .box {
      position: relative;

      width: 100%;

      margin-top: 0.6rem;

      input,
      select {
        width: 100%;

        font-size: 1.3rem;

        outline: none;
        border: 1px solid transparent;
        border-radius: 0.5rem;
        padding: 10px;
        margin-top: 1.6rem;

        background: #fff;
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);

        transition: 0.5s;

        &:hover,
        &:focus {
          box-shadow: 0 0 5px 1px rgba(0, 0, 255, 0.6);
        }
      }

      input[type='checkbox'] {
        height: 20px;
        width: 20px;

        margin: 10px 1rem auto 1rem;

        cursor: pointer;

        ~ label {
          position: relative;
        }
      }

      label {
        position: absolute;
        top: 0;
        left: 0;

        font-size: 1.1rem;
        font-weight: bold;
      }

      select {
        cursor: pointer;
      }

      .submitBtn {
        width: 100%;

        background: #0c1;
        color: #fff;

        outline: none;
        border: none;
        border-radius: 10px;
        padding: 0.5rem;

        cursor: pointer;
        transition: 0.5s;

        font-size: 1.5rem;

        &:hover {
          box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
          opacity: 0.8;
        }
      }
    }

    @media screen and (max-width: 920px) {
      grid-template-areas:
        'image image'
        'person animal';
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 600px) {
      grid-template-areas:
        'image'
        'person'
        'animal';
      grid-template-columns: 1fr;
    }
  }

  @media screen and (max-width: 1050px) {
    max-width: 95%;
  }
`
