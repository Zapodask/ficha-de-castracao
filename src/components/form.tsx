import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, useWatch } from 'react-hook-form'
import InputMask from 'react-input-mask'

import { Container } from '@/styles/components/form'
import { toPdf } from '@/services/toPdf'

enum SpecieEnum {
  canina = 'Canina',
  felina = 'Felina',
}

enum GenderEnum {
  female = 'female',
  male = 'male',
}

interface Animal {
  name: string
  specie: SpecieEnum
  age: string
  microchip: string
  coat: string
  weight: string
  features: string
  gender: GenderEnum
}

interface Person {
  name: string
  birthday: string
  rg: string
  cpf: string
  address: string
  number: string
  neighborhood: string
  phone: string
  remember?: boolean
}

interface Data {
  ficha: number
  image: File[] | File
  animal: Animal
  person: Person
}

export const Form = () => {
  const [preview, setPreview] = useState<string>()

  const { register, handleSubmit, reset, control, setValue } = useForm<Data>({})

  const onSubmit: SubmitHandler<Data> = async (data) => {
    data.image = data.image[0]

    toPdf(data)

    setValue('animal.weight', '')

    if (!data.person.remember) {
      setValue('person.cpf', '')
      setValue('person.phone', '')
    }
    reset({
      person: data.person.remember ? data.person : {},
    })

    delete data.person.remember
  }

  const images = useWatch({
    control,
    name: 'image',
  })

  useEffect(() => {
    if (images && !(images instanceof File) && images.length > 0) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(images[0])
    } else {
      setPreview(null)
    }
  }, [images])

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="image">
          <input
            type="file"
            id="image"
            accept=".png,.jpg"
            {...register('image')}
          />
          <label className="imageBtn" htmlFor="image">
            Selecionar imagem
          </label>

          {preview && (
            <div className="preview">
              <img src={preview} />
            </div>
          )}
        </div>
        <div className="person">
          <h2>Pessoa</h2>
          <div className="box">
            <input id="person.name" required {...register('person.name')} />
            <label htmlFor="person.name">Nome</label>
          </div>
          <div className="box">
            <input
              id="person.birthday"
              type="date"
              {...register('person.birthday')}
            />
            <label htmlFor="person.birthday">Data de nascimento</label>
          </div>
          <div className="box">
            <input
              id="person.rg"
              inputMode="numeric"
              {...register('person.rg')}
            />
            <label htmlFor="person.rg">RG</label>
          </div>
          <div className="box">
            <InputMask
              id="person.cpf"
              mask="999.999.999-99"
              {...register('person.cpf')}
            />
            <label htmlFor="person.cpf">CPF</label>
          </div>
          <div className="box">
            <input id="person.address" {...register('person.address')} />
            <label htmlFor="person.address">Endereço</label>
          </div>
          <div className="box">
            <input id="person.number" {...register('person.number')} />
            <label htmlFor="person.number">Numero</label>
          </div>
          <div className="box">
            <input
              id="person.neighborhood"
              {...register('person.neighborhood')}
            />
            <label htmlFor="person.neighborhood">Bairro</label>
          </div>
          <div className="box">
            <InputMask
              id="person.phone"
              mask="(99) 99999-9999"
              {...register('person.phone')}
            />
            <label htmlFor="person.phone">Telefone</label>
          </div>
          <div className="box">
            <input
              id="person.remember"
              type="checkbox"
              {...register('person.remember')}
            />
            <label htmlFor="person.remember">Guardar pessoa?</label>
          </div>
        </div>
        <div className="animal">
          <h2>Animal</h2>
          <div className="box">
            <input id="animal.name" required {...register('animal.name')} />
            <label htmlFor="animal.name">Nome</label>
          </div>
          <div className="boxes">
            <div className="box">
              <select id="animal.specie" {...register('animal.specie')}>
                <option value="Canina">Canina</option>
                <option value="Felina">Felina</option>
              </select>
              <label htmlFor="animal.specie">Espécie</label>
            </div>
            <div className="box">
              <InputMask
                id="animal.weight"
                mask="99Kg"
                {...register('animal.weight')}
              />
              <label htmlFor="animal.weight">Peso</label>
            </div>
          </div>
          <div className="box">
            <input id="animal.age" {...register('animal.age')} />
            <label htmlFor="animal.age">Idade</label>
          </div>
          <div className="box">
            <input id="animal.coat" {...register('animal.coat')} />
            <label htmlFor="animal.coat">Pelagem</label>
          </div>
          <div className="box">
            <input id="animal.features" {...register('animal.features')} />
            <label htmlFor="animal.features">Características</label>
          </div>
          <div className="box">
            <select id="animal.gender" {...register('animal.gender')}>
              <option value="female">Fêmea</option>
              <option value="male">Macho</option>
            </select>
            <label htmlFor="animal.gender">Gênero</label>
          </div>
          <div className="box">
            <input id="animal.microchip" {...register('animal.microchip')} />
            <label htmlFor="animal.microchip">Microchip nº</label>
          </div>
          <div className="box">
            <input id="ficha" type="number" required {...register('ficha')} />
            <label htmlFor="ficha">Ficha nº</label>
          </div>
          <div className="box">
            <button type="submit" className="submitBtn">
              Gerar
            </button>
          </div>
        </div>
      </form>
    </Container>
  )
}
