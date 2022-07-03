import { Button, Flex, Stack, FormLabel, FormControl } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail invalido'),
    password: yup.string().required('Senha obrigatória')
})

export default function Home() {

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const {errors} = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    console.log(values);
  }



  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      justify='center'
    >
      <Flex
        as='form'
        width='100%'
        maxWidth={360}
        bg='gray.800'
        padding={8}
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input name="email" type="email" label="E-mail" {...register('email')} error={errors.email}/>
          <Input name="password" type="password" label="Senha" {...register('password')} error={errors.password}/>
        </Stack>
        <Button
          type="submit"
          mt='6'
          colorScheme="pink"
          size='lg'
          // isLoading={useFormState.isSubmitting}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  )
}
