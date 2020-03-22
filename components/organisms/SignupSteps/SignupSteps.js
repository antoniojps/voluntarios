import React, { useEffect, useState, useMemo } from 'react'
import './SignupSteps.module.scss'
import { useSetState } from 'react-use'
import { InputText, InputMultiple, InputPassword } from 'components/molecules'
import { AnimatePresence, motion } from 'framer-motion'
import locationsData from 'assets/data/locations.json'

const locations = locationsData.map(location => {
  return {
    label: location.name,
    id: location.name,
    location,
  }
})

const SignupSteps = ({ categories = []}) => {
  const [state, setState] = useSetState({
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      job: null,
      categories: [],
      locations: [],
    },
  );

  useEffect(() => {
    console.log({form: state})
  }, [state])

  const pages = useMemo(() => (
    [
      {
        type: 'text',
        name: 'firstName',
        placeholder: 'Primeiro nome...',
        title: 'Qual é o seu primeiro nome?',
        required: true,
        autoFocus: true,
        value: '',
      },
      {
        type: 'text',
        name: 'lastName',
        placeholder:'Último nome...',
        title: 'Qual é o seu último nome?',
        value: '',
        required: true,
        autoFocus: true,
      },
      {
        type: 'multiple',
        name: 'categories',
        title: 'Quais sao as suas competencias?',
        value: '',
        items: categories,
        limit: 5,
        required: true,
        autoFocus: true,
        handler: (values) => values.map(category => category.id),
      },
      {
        type: 'text',
        title: 'Qual é a sua profissão?',
        name: 'job',
        placeholder: "A sua profissão",
        value: '',
        autoFocus: true,
      },
      {
        type: 'multiple',
        name: 'locations',
        title: 'Qual a sua localidade?',
        placeholder: 'Pesquise distritos',
        value: '',
        items: locations,
        limit: 5,
        required: true,
        handler: (values) => values.map(item => item.location),
        autoFocus: true,
      },
      {
        type: 'text',
        name: 'email',
        title: 'Qual o seu endereço de email?',
        placeholder: 'nome@mail.com',
        value: '',
        required: true,
        autoFocus: true,
      },
      {
        type: 'password',
        name: 'password',
        title: 'Palavra-chave',
        placeholder: 'eslindaMaria@2020',
        value: '',
        required: true,
        autoFocus: true,
      },
    ]
  ), [categories])

  const [page, setPage] = useState(0)

  const renderInput = () => {
    const pageProps = pages[page]
    const step = page + 1

    if (pageProps.type === 'text') {
      return (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ ease: 'easeIn' }}
          key={pageProps.name}
        >
          <InputText
            number={step}
            value={state[pageProps.name]}
            handleChange={(value) => setState({[pageProps.name]: value})}
            {...pageProps}
          />
        </motion.div>
      )
    }
    if (pageProps.type === 'password') {
      return (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ ease: 'easeIn' }}
          key={pageProps.name}
        >
          <InputPassword
            number={step}
            value={state[pageProps.name]}
            handleChange={(value) => setState({[pageProps.name]: value})}
            {...pageProps}
          />
        </motion.div>
      )
    }
    if (pageProps.type === 'multiple') {
      return (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ ease: 'easeIn' }}
          key={pageProps.name}
        >
        <InputMultiple
          number={step}
          value={state[pageProps.name]}
          handleChange={(values) => {
            let parsedValues = values
            if (typeof pageProps.handler === 'function') {
              parsedValues = pageProps.handler(values)
            }
            setState({[pageProps.name]: parsedValues})
          }}
          {...pageProps}
          />
        </motion.div>
      )
    }

    return null;
  }

  return (
    <div>
      <div style={{marginBottom:"70px"}}>
        <button onClick={() => (page > 0 && page < pages.length) && setPage(page - 1)}>
          previous
        </button>
        <button onClick={() => (page >= 0 && page < pages.length - 1) && setPage(page + 1)}>
            next
        </button>
      </div>
      <AnimatePresence initial={false} exitBeforeEnter>
        {renderInput()}
      </AnimatePresence>
    </div>
  )
}

export default SignupSteps