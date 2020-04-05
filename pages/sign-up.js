/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import { SIGNUP_USER_MUTATION, CATEGORIES_QUERY, CURRENT_USER_QUERY } from '../graphql'
import { FormSteps, SignupSubmit } from '../components/organisms';
import { Steps } from '../components/molecules';
import { Layout } from '../components/atoms';
import { getErrorMessage } from '../utils/form';
import * as yup from 'yup'
import { withAuth } from 'utils/auth'
import { withApollo } from '../apollo/client';
import { fetchGeolocationsById } from '../services/places';
import { Note } from '@zeit-ui/react'
import cleanDeep from 'clean-deep'
import Seo from 'containers/Seo'

const parseLocationsIds = (locations) => {
  return locations.map(location => location.value)
}

function SignUp() {
  const [step, setStep] = useState(0)
  const [canChange, setCanChange] = useState(false)
  const { data: categoriesData, loading, error } = useQuery(CATEGORIES_QUERY)
  const [signUp, { data: signUpData, loading: signUpLoading, error: signUpError }] = useMutation(SIGNUP_USER_MUTATION)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleSubmit = async (data) => {
    setHasSubmitted(true)
    try {
      const locationsIds = data.locations && data.locations.length > 0 ? parseLocationsIds(data.locations) : [];
      let locations = []
      if (locationsIds.length > 0) locations = await fetchGeolocationsById(locationsIds)

      const dirty = {
        ...data,
        locations,
      }
      const input = cleanDeep(dirty)
      await signUp({
        variables: {
          input,
        },
        update(cache, { data: { signUp } }) {
          cache.writeQuery({
            query: CURRENT_USER_QUERY,
            data: {currentUser: signUp},
          })
        },
      })
      setSubmitError(false)
    } catch (err) {
      setSubmitError(err.message)
    }
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

  const form = useMemo(() => [
    {
      type: 'multiple',
      name: 'categories',
      title: 'Quais são as tuas áreas de interesse?',
      placeholder: 'Selecione áreas de interesse',
      autoFocus: true,
      options: categories,
      schema: yup.array().of(yup.string()),
      isLoading: loading,
    },
    {
      type: 'text',
      name: 'job',
      title: 'Qual é a tua ocupação/profissão?',
      placeholder: 'Ocupação...',
      autoFocus: true,
      schema: yup.string().test(
        'is-job',
        'Deve ter no mínimo 3 caracteres',
        (input) => {
          const value = input || ''
          if (value === '') return true
          return value.length >= 3
        },
      ).test(
        'is-job',
        'Deve ter no máximo 48 caracteres',
        (input) => {
          const value = input || ''
          if (value === '') return true
          return value.length <= 48
        },
      ),
    },
    {
      type: 'location',
      name: 'locations',
      title: 'Onde tens possibilidade de ajudar?',
      placeholder: 'Pesquise uma localização',
      autoFocus: true,
      schema: yup.array().of(yup.object({
        name: yup.string(),
        id: yup.string(),
      })),
    },
    {
      type: 'text',
      name: 'firstName',
      placeholder: 'Primeiro nome...',
      title: 'Qual é o teu primeiro nome?',
      autoFocus: true,
      schema: yup.string().required().max(32).min(2),
    },
    {
      type: 'text',
      name: 'lastName',
      placeholder:'Último nome...',
      title: 'Qual é o teu último nome?',
      autoFocus: true,
      schema: yup.string().required().max(32).min(2),
    },
    {
      type: 'text',
      name: 'email',
      title: 'Insere o teu email',
      placeholder: 'nome@mail.com',
      autoFocus: true,
      schema: yup.string().required().email('Mhm...esse email não parece ser válido.'),
    },
    {
      type: 'password',
      name: 'password',
      title: 'Define a tua palavra-chave',
      placeholder: 'palavra-chave',
      autoFocus: true,
      schema: yup.string().required().min(8),
    },
  ], [categories, loading])

  const hasRegistered = !loading && signUpData

  const title = useMemo(() => {
    if (hasRegistered) return 'Bem-vindo!'
    return 'Voluntariar'
  }, [hasRegistered])

  useEffect(() => {
    if (signUpError) {
      setHasSubmitted(false)
    }
  }, [signUpError])

  return (
    <>
      <Seo title="Inscrição" description="Preenche um formulário para te tornares um voluntário." />
      <Layout
        title={title}
        description={
          hasRegistered
            ? (
              <p>
                Obrigado por fazeres parte do Voluntários!
                <span role="img" aria-label="praise">🙌</span>
              </p>
            )
            : (
              <Steps
                steps={form.length - 1}
                currentStep={step}
                title={`${step + 1} de ${form.length} até estar inscrito`}
                handleChange={handleStepChange}
                showNext={canChange}
              />
            )
        }
        skipAuth
      >
        <div className="form-fullscreen">
            {hasSubmitted ? (
              <SignupSubmit successToggle={!loading && !signUpError && signUpData} user={hasRegistered ? signUpData.signUp : {}} />
          ) : (
              <>
                <FormSteps
                  currentStep={step}
                  onSubmit={handleSubmit}
                  onStepChange={handleStepChange}
                  onChangeValid={setCanChange}
                  form={form}
                />
                {
                  signUpError && (
                    <Note label={false} type="error">
                      Não foi possivel inscrever, contacte-nos caso o erro persista. Tente outro email.
                    </Note>
                  )
                }
              </>
            )
          }
        </div>
      </Layout>
    </>
  );
}

// redirect authenticated users on the server side to index
SignUp.getInitialProps = (ctx) => withAuth(ctx, {redirectAuthenticated: true})

export default withApollo({ ssr: true })(SignUp);
