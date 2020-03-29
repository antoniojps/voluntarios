/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CATEGORIES_QUERY } from '../graphql'
import { FormSteps } from '../components/organisms';
import { Steps } from '../components/molecules';
import { Layout } from '../components/atoms';
import { getErrorMessage } from '../utils/form';
import { useRouter } from 'next/router';
import * as yup from 'yup'
import { withAuth } from 'utils/auth'
import { withApollo } from '../apollo/client';


const SignUpMutation = gql`
  mutation SignUpMutation($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      email
      firstName
      lastName
    }
  }
`;

function SignUp() {
  const [step, setStep] = useState(0)
  const [canChange, setCanChange] = useState(false)
  const { data: categoriesData, loading, error } = useQuery(CATEGORIES_QUERY)

  const handleSubmit = (data) => {
    console.log('inscrever utilizador', data)
  }

  const handleStepChange = (next) => {
    if (next > step && canChange) setStep(next)
    if (next < step) setStep(next)
  }

  const categories = useMemo(() => {
    if (loading || error) return []
    if (categoriesData && categoriesData.allCategories && categoriesData.allCategories.length > 0) {
      return categoriesData.allCategories.map(category => ({...category, value: category._id, label: category.name }))
    }
  }, [categoriesData])

  return (
    <Layout
      title="Voluntariar"
      description={
        <Steps
          steps={3}
          currentStep={step}
          title={`${step + 1} de 4 até estar inscrito`}
          handleChange={handleStepChange}
          showNext={canChange}
        />
      }
      skipAuth
    >
      <div className="form-fullscreen">
        <FormSteps
          currentStep={step}
          onSubmit={handleSubmit}
          onStepChange={handleStepChange}
          onChangeValid={setCanChange}
          form={[
            {
              type: 'multiple',
              name: 'categories',
              title: 'Áreas de interesse',
              placeholder: 'Seleccione áreas de interesse',
              autoFocus: true,
              options: categories,
              schema: yup.array().of(yup.string()),
              note: 'Onde pode ajudar?',
              isLoading: loading,
            },
            // {
            //   type: 'location',
            //   name: 'locations',
            //   title: 'Qual a sua localidade?',
            //   placeholder: 'Seleccione uma localização',
            //   autoFocus: true,
            //   schema: yup.array().of(yup.object({
            //     name: yup.string(),
            //     geolocation: {
            //         long: yup.number(),
            //         lat: yup.number(),
            //     },
            //   })),
            // },
            {
              type: 'text',
              name: 'firstName',
              placeholder: 'Primeiro nome...',
              title: 'Qual é o seu primeiro nome?',
              autoFocus: true,
              schema: yup.string().required(),
            },
            {
              type: 'text',
              name: 'lastName',
              placeholder:'Último nome...',
              title: 'Qual é o seu último nome?',
              autoFocus: true,
              schema: yup.string().required(),
            },
            {
              type: 'text',
              name: 'email',
              title: 'Qual o seu endereço de email?',
              placeholder: 'nome@mail.com',
              autoFocus: true,
              schema: yup.string().required().email('Mhm...esse email não parece ser válido.'),
            },
            {
              type: 'password',
              name: 'password',
              title: 'Palavra-chave',
              placeholder: 'palavra-chave',
              autoFocus: true,
              schema: yup.string().required().min(8),
            },
          ]}
        />
      </div>
    </Layout>
  );
}

// redirect authenticated users on the server side to index
SignUp.getInitialProps = (ctx) => withAuth(ctx, {redirectAuthenticated: true})

export default withApollo({ ssr: true })(SignUp);
