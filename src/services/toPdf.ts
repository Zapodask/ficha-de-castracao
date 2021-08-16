import { PDFDocument } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import download from 'downloadjs'

import Termo from '@/assets/termo.json'

interface Props {
    ficha: number
    image: any
    animal: {
        name: string
        specie: 'canina' | 'felina'
        age: string
        microchip: string
        coat: string
        weight: string
        features: string
        gender: 'male' | 'female'
    }
    person: {
        name: string
        birthday: string
        rg: string
        cpf: string
        address: string
        number: string
        neighborhood: string
        phone: string
    }
}

export const toPdf = async (data: Props) => {
    const pdfDoc = await PDFDocument.load(Termo.pdf)

    pdfDoc.registerFontkit(fontkit)

    const form = pdfDoc.getForm()

    // Image
    if (data.image) {
        const image = await data.image.arrayBuffer()
        const embedImage = await pdfDoc.embedJpg(image)
        const imageButton = form.getButton('Button1')
        imageButton.setImage(embedImage)
    }

    // Animal
    const AnimalName = form.getTextField('Text10')
    AnimalName.setText(data.animal.name)

    const Specie = form.getTextField('Text11')
    Specie.setText(data.animal.specie)

    const Age = form.getTextField('Text12')
    Age.setText(data.animal.age)

    const Microchip = form.getTextField('Text13')
    Microchip.setText(data.animal.microchip)

    const Coat = form.getTextField('Text14')
    Coat.setText(data.animal.coat)

    if (data.animal.weight) {
        const Weight = form.getTextField('Text24')
        Weight.setText(data.animal.weight)
    }

    const Features = form.getTextField('Text15')
    Features.setText(data.animal.features)

    const Gender = data.animal.gender
    switch (Gender) {
        case 'male':
            form.getCheckBox('Button2').check()
            break
        case 'female':
            form.getCheckBox('Button7').check()
            break
    }

    // Person
    const PersonName = form.getTextField('Text16')
    PersonName.setText(data.person.name)

    const Birthday = form.getTextField('Text17')
    Birthday.setText(data.person.birthday)

    const Rg = form.getTextField('Text18')
    Rg.setText(JSON.stringify(data.person.rg))

    const Cpf = form.getTextField('Text19')
    Cpf.setText(data.person.cpf)

    const Address = form.getTextField('Text20')
    Address.setText(data.person.address)

    const Number = form.getTextField('Text21')
    Number.setText(JSON.stringify(data.person.number))

    const Neighborhood = form.getTextField('Text22')
    Neighborhood.setText(data.person.neighborhood)

    const Phone = form.getTextField('Text23')
    Phone.setText(data.person.phone)

    const Ficha = form.getTextField('Text2')
    Ficha.setText(data.ficha + '/' + new Date().getFullYear())

    const pdfBytes = await pdfDoc.save()

    download(pdfBytes, data.ficha + '.pdf', 'application/pdf');
}
