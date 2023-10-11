import { Button, Htag, Input, P, Rating, Tag, Textarea, Up } from '@/components'
import { useState } from 'react'
import { withLayout } from "@/layout/Layout";
import { GetStaticProps } from "next";
import axios from 'axios'
import { MenuItem } from "@/interfaces/menu.interface";
import { API } from '@/helpers/api';
import { ButtonIcon } from '@/components/ButtonIcon/ButtonIcon';


function Home({ menu }: HomeProps) {
  const [counter, setCounter] = useState<number>(0)
  const [rating, setRating] = useState<number>(1);

  return (
    <>
      <main>

        <Htag tag='h3'>Page Router</Htag>

        <P size='big'>
          {counter}
        </P>

        <Button
          appearance='primary'
          // arrow='down'
          onClick={() => setCounter(counter => ++counter)}
        >++</Button>
        <Button appearance='ghost' arrow='down'>Button</Button>

        <P size='mini'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </P>

        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </P>

        <P size='big'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </P>

        <Tag size='s' color='ghost'>ghost</Tag>
        <Tag size='m' color='green'>green</Tag>
        <Tag size='m' color='red'>red</Tag>
        <Tag size='m' color='gray'>gray</Tag>
        <Tag size='m' color='primary'>primary</Tag>

        <Rating rating={rating} setRating={setRating} isEditable={true} />

        <Input placeholder={'asdasdfasdf'} />

        <Textarea placeholder={'asdasdfasdf'} />

        <ButtonIcon appearance='primary' icon='up' />
        <ButtonIcon appearance='primary' icon='menu' />
        <ButtonIcon appearance='white' icon='menu' />
        <ButtonIcon appearance='white' icon='close' />

      </main>
    </>
  )
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  })
  return {
    props: {
      menu,
      firstCategory
    }
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}
