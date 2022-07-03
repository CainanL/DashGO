import { Box, Button, Flex, Heading, Divider, VStack, SimpleGrid, HStack, FormLabel } from "@chakra-ui/react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/Form/Input";
import { useMutation } from 'react-query'
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail invalido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No minimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

export default function CreateUser() {

    const router = useRouter();

    const createUser = useMutation(async (user: CreateUserFormData) => {
        const response = await api.post('users', {
            user: {
                ...user,
                created_at: new Date()
            }
        })

        return response.data.user;
    }, {
        onSuccess: ()=> {
            queryClient.invalidateQueries('users')
        }
    });

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    });

    const { errors } = formState;

    console.log(errors);

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await createUser.mutateAsync(values);

        router.push('/users')
    };

    return (
        <Box>

            <Header />

            <Flex
                w='100%'
                my="6"
                maxWidth={1480}
                mx="auto"
                px="6"
            >

                <Sidebar />

                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading
                        size="lg"
                        fontWeight="normal"
                    >
                        Criar usuário
                    </Heading>

                    <Divider
                        my="6"
                        borderColor="gray.700"
                    />

                    <VStack spacing="8">
                        <SimpleGrid
                            minChildWidth="240px"
                            spacing={["6", "8"]}
                            w="100%"
                        >
                            <Box>
                                <FormLabel htmlFor="name">Nome</FormLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    label="Nome completo"
                                    {...register('name')}
                                    error={errors.name}
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="email">E-mail</FormLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    label="E-mail"
                                    {...register('email')}
                                    error={errors.email}
                                />
                            </Box>
                        </SimpleGrid>
                        <SimpleGrid
                            minChildWidth="240px"
                            spacing={["6", "8"]}
                            w="100%"
                        >
                            <Box>
                                <FormLabel htmlFor="password">Senha</FormLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    {...register('password')}
                                    error={errors.password}
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="password-confirmation">Confirmar senha</FormLabel>
                                <Input
                                    id="password-confirmation"
                                    name="password-confirmation"
                                    label="confirmar senha"
                                    type="password"
                                    {...register('password_confirmation')}
                                    error={errors.password_confirmation}
                                />
                            </Box>
                        </SimpleGrid>
                    </VStack>

                    <Flex
                        mt="8"
                        justify="flex-end"
                    >
                        <HStack
                            spacing="4"
                        >
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button colorScheme="pink" type="submit" isLoading={formState.isSubmitting}>Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>

            </Flex >

        </Box >
    )
}