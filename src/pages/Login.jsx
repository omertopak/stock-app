import Avatar from "@mui/material/Avatar"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import LockIcon from "@mui/icons-material/Lock"
import image from "../assets/result.svg"
import { Link, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"

    import { Form, Formik } from "formik"
    // import { object, string, number, date, InferType } from 'yup';
    import { string,object } from 'yup';
import { login } from "../service/authApiCall"


const Login = () => {
  const navigate = useNavigate()


                    //loginschema yi asagida fonksiyonun icine yazdigimiz icin errors u buradan yakalar ve asagida kullanmamizi saglar
                    const loginSchema = {
                      // name: string().required(),
                      // age: number().required().positive().integer(),
                      email: string()
                      .email("emailin format hatalarini da buradan veririz")
                      .required("hata mesajini buradan verdik"),
                      // ^^^hata mesajini asagida error yakalar ve true ise basar. her ikisinin de default degerleri vardir

                      // website: string().url().nullable(),
                      // createdOn: date().default(() => new Date()),
                      password:string()
                      .required()
                      .min(8,"en az 8 karakter gir ulan")
                      //password e deger yazmadim cunku default degerleri gorebilmek istedim
                      .max(16)
                      .matches(/\d+/,"en az bir karakter icermelidir")
                      .matches(/[a-z]/,"en az bir kucuk harf icermelidir")
                      .matches(/[A-Z]/,"en az bir buyuk harf icermelidir")
                      // .matches(/[^(?=.*[A-Z])(?=.*[.,!?]).*$]/,"en az bir ozel karakter icermelidir"),
                      //tek bir matces ile de yapilabilir ama kullaniciya ayri ayri mesaj vermemizi saglar.
                    }

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

                    <Formik

                      //login page de olan degiskeleri tanimladik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={loginSchema}
                      //values initial values a erisilirken action icinde 
                      onSubmit={(values, actions) => {
                        //TODO login() POST islemi yapacak bir login yapmamiz lazim
                        login(values)
                        actions.resetForm()
                        actions.setSubmitting(false)

                      }}>
                      {/* formik in onChange fonksiyonu ayni sekilde onBlur*/}
                      {({ handleChange, handleBlur, values ,touched,errors}) => (
                        //formik in Form unu kullanmanin artilari var
                        <Form>
                          <Box
                            component="form"
                            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                          >
                            <TextField
                              label="Email"
                              name="email"
                              id="email"
                              type="email"
                              variant="outlined"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              // buna dokunulup dokunulmadigini dokunulduysa ve cikildiysa kirmizi hale getirir. dokunulursa error true ya doner ve helpertexti kontrol eder
                              error={touched.email && Boolean(errors.email) }
                              helperText={touched.email && errors.email}
                            />
                            <TextField
                              label="password"
                              name="password"
                              id="password"
                              type="password"
                              variant="outlined"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              // buna dokunulup dokunulmadigini dokunulduysa ve cikildiysa kirmizi hale getirir. dokunulursa error true ya doner ve helpertexti kontrol eder
                              error={touched.password && Boolean(errors.password) }
                              helperText={touched.password && errors.password}
                            />
                            <Button variant="contained" type="submit">
                              Submit
                            </Button>
                          </Box>
                        </Form>
                      )}

                    </Formik>

           {/* ilk hali       */}

          {/* <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              name="email"
              id="email"
              type="email"
              variant="outlined"
            />
            <TextField
              label="password"
              name="password"
              id="password"
              type="password"
              variant="outlined"
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box> */}

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
