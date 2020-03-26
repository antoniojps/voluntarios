/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FormSteps } from '../components/organisms';
import { Steps } from '../components/molecules';
import { Layout } from '../components/atoms';
import { getErrorMessage } from '../utils/form';
import { useRouter } from 'next/router';
import * as yup from 'yup'
import { redirectAuthenticated } from 'utils/auth'
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

  const handleSubmit = (data) => {
    console.log('inscrever utilizador', data)
  }

  const handleStepChange = (next) => {
    if (next > step && canChange) setStep(next)
    if (next < step) setStep(next)
  }

  return (
    <Layout
      title="Inscrição"
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
              type: 'text',
              name: 'firstName',
              placeholder: 'Primeiro nome...',
              title: 'Qual é o seu primeiro nome?',
              autoFocus: true,
              value: '',
              schema: yup.string().required(),
            },
            {
              type: 'text',
              name: 'lastName',
              placeholder:'Último nome...',
              title: 'Qual é o seu último nome?',
              value: '',
              autoFocus: true,
              schema: yup.string().required(),
            },
            {
              type: 'text',
              name: 'email',
              title: 'Qual o seu endereço de email?',
              placeholder: 'nome@mail.com',
              value: '',
              autoFocus: true,
              schema: yup.string().required().email(),
            },
            {
              type: 'password',
              name: 'password',
              title: 'Palavra-chave',
              placeholder: 'palavra-chave',
              value: '',
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
SignUp.getInitialProps = redirectAuthenticated

export default withApollo({ ssr: true })(SignUp);
