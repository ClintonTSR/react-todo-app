// import { Button, Divider, Stack } from "@mui/material";
// import { Fragment, useState } from "react";
// import MyTextField from "../components/inputs/MyTextField";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

// type FormInput = {
//     email: string,
//     username: string,
//     password: string,
// }

// const LoginPage = () => {
//     const navigate = useNavigate();
//     const MODE = {
//         login: 'login',
//         signup: 'signup'
//     }


//     const { control, handleSubmit } = useForm<FormInput>({
//         defaultValues: {
//             email: "",
//             username: "",
//             password: "",
//         }
//     });

//     const { mutateAsync } = useMutation({
//         mutationFn: async (variables: LoginMutationVariables) => {
//             return gqlClient.request(
//                 LoginMutationDoc,
//                 variables)
//         },
//     })

//     async function onSubmit({ email, password, username }: FormInput) {
//         if (mode === MODE.login) {
//             const data = await mutateAsync({ username, password })
//             if (!data) return;

//             if (data.login.success) {
//                 navigate('lists')
//             }

//         }
//     }

//     const [mode, setMode] = useState(MODE.login);
//     return (
//         <Stack rowGap={2} maxWidth="sm" marginX="auto" justifyContent="center" height="100vh">
//             {
//                 mode === MODE.signup ?
//                     <Fragment>
//                         <MyTextField<FormInput> label="Email" name={'email'} control={control}/>
//                         <MyTextField<FormInput> label="Username" name={'username'} control={control} required/>
//                         <MyTextField<FormInput> label="Password" name={'password'} control={control} required/>
//                         <Button variant="contained" onClick={handleSubmit(onSubmit)}>Sign Up</Button>
//                         <Divider/>
//                         <Button onClick={() => setMode(MODE.login)}> Registered? Log in here</Button>
//                     </Fragment>
//                     :
//                     <Fragment>
//                         <MyTextField<FormInput> label="Username" name={'username'} control={control}/>
//                         <MyTextField<FormInput> label="Password" name={'password'} control={control}/>
//                         <Button variant="contained" onClick={handleSubmit(onSubmit)}>Login</Button>
//                         <Divider/>
//                         <Button onClick={() => setMode(MODE.signup)}> Don&apos;t have a account </Button>
//                     </Fragment>
//             }
//         </Stack>
//     );
// };

// export default LoginPage;