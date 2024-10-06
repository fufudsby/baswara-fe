import React from 'react'
import { BlitzPage } from '@blitzjs/next'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { Box, Typography, Container, Paper, FormControlLabel, Checkbox } from '@mui/material'
import { ReactSVG } from 'react-svg'
import { useFormik } from 'formik'
import { StatusCodes } from 'http-status-codes'
import ReCAPTCHA from 'react-google-recaptcha'
import { signIn } from 'next-auth/react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { StyledAuth, StyledFormHelperText } from 'src/styles/auth'
import { StyledPassword } from 'src/styles/form'
import { FormikContext } from 'src/contexts/formik'
import FormikField from 'src/core/components/formik/Field'
import ButtonMain from 'src/core/components/ButtonMain'
import { redirectAuthentication } from 'utils/redirectAuthentication'
import { Login } from 'src/validations/auth/schemas'
import { BreakpointsContext } from 'src/contexts/breakpoints'

const Home: BlitzPage = () => {
  const router = useRouter()
  const { downLg } = React.useContext(BreakpointsContext)
  const [loading, setLoading] = React.useState(false)
  const [password, setPassword] = React.useState(true)

  const onClickPassword = React.useCallback(() => {
    setPassword(!password)
  }, [password])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      token: '',
    },
    validationSchema: toFormikValidationSchema(Login),
    onSubmit: async (values) => {
      // setLoading(true)
      try {
        const result = await signIn('credentials', { ...values, redirect: false })
        console.log('result', result)
        if (result?.status === StatusCodes.OK) {
          if (downLg) {
            await router
              .replace('/admin', '/admin', {
                unstable_skipClientCache: true,
              })
              .then(() => router.reload())
          } else {
            await router.push(`/admin`, '/admin')
          }
        } else {
          setLoading(false)
          // showSnackbar('Terjadi kesalahan pada server.', 'error')
        }
      } catch (error) {
        console.log('error', error)
        setLoading(false)
        // showSnackbar('Terjadi kesalahan pada server.', 'error')
        // await captcha.current?.reset()
      }
    },
  })

  const onVerify = React.useCallback(
    async (recaptchaResponse: string) => {
      await formik.setFieldTouched('token', true)
      await formik.setFieldValue('token', recaptchaResponse)
    },
    [formik]
  )

  return (
    <StyledAuth>
      <Container maxWidth="sm">
        <Paper elevation={0}>
          <Box className="content">
            <Box className="img">
              <ReactSVG
                beforeInjection={(svg) => {
                  svg.classList.add(`svg-icon`)
                  svg.setAttribute('style', `display: block;`)
                }}
                className={`wrapper-svg`}
                src={`/images/logo_bswr.svg`}
                wrapper="div"
              />
            </Box>
            <Typography className="title">Planning System</Typography>
            <FormikContext.Provider
              value={{
                formik,
              }}
            >
              <FormikField label="Email" type="email" />
              <StyledPassword>
                <FormikField
                  label="Kata Sandi"
                  id="password"
                  type={password ? 'password' : 'text'}
                  onKeyDown={(e) => (e.key === 'Enter' ? formik.handleSubmit() : null)}
                />
                <FormControlLabel
                  control={<Checkbox size="small" disableRipple onClick={onClickPassword} />}
                  label="Lihat kata sandi"
                />
              </StyledPassword>
              <Box marginBottom={3}>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                  onChange={onVerify}
                />
                {formik.touched.token && !!formik.errors?.token && (
                  <StyledFormHelperText error>{formik.errors.token}</StyledFormHelperText>
                )}
              </Box>
              <ButtonMain
                onClick={() => formik.handleSubmit()}
                loading={loading}
                text="Masuk"
                variant="outlined"
                color="secondary"
              />
            </FormikContext.Provider>
          </Box>
        </Paper>
      </Container>
    </StyledAuth>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  return redirectAuthentication(ctx)
}

export default Home
