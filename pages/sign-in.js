import React, { useState } from 'react';
import { withApollo } from '../apollo/client';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { getErrorMessage } from '../utils/form';
import { useRouter } from 'next/router';
import { FormSteps } from '../components/organisms';
import { Steps, Actions } from '../components/molecules';
import { Layout } from '../components/atoms';
import * as yup from 'yup'
import { redirectAuthenticated } from 'utils/auth'

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      _id
      email
    }
  }
`;

function SignIn() {
  const client = useApolloClient();
  const [signIn] = useMutation(SignInMutation);
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();
  const [step, setStep] = useState(0)
  const [canChange, setCanChange] = useState(false)

  const handleStepChange = (next) => {
    if (next > step && canChange) setStep(next)
    if (next < step) setStep(next)
  }

  async function handleSubmit(variables) {
    try {
      await client.resetStore();
      const { data } = await signIn({
        variables,
      });
      if (data.signIn._id) {
        await router.push('/');
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  return (
      <Layout
        title="Log in"
        description={
          <Steps
            steps={2}
            currentStep={step}
            title={`${step + 1} de 2 até estar autênticado`}
            handleChange={handleStepChange}
            showNext={canChange}
          />
        }
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
                name: 'email',
                title: 'Email',
                placeholder: 'nome@mail.com',
                value: '',
                autoFocus: true,
                schema: yup.string().required().email(),
              },
              {
                type: 'password',
                name: 'password',
                title: 'Palavra-chave',
                placeholder: 'eslindaMaria@2020',
                value: '',
                autoFocus: true,
                schema: yup.string().required(),
              },
            ]}
          />
          <Actions showError={errorMsg} errorMessage={errorMsg} />
        </div>
      </Layout>
  );
}

SignIn.getInitialProps = redirectAuthenticated

export default withApollo({ ssr: false })(SignIn);
