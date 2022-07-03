import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
    return (
        <Flex>
            {
                showProfileData && (
                    <Box
                        mr="4"
                        textAlign="right"
                    >
                        <Text>Cainan Luyles</Text>
                        <Text
                            color="gray.300"
                            fontSize="small"
                        >
                            cainanluyles@gmail.com
                        </Text>
                    </Box>
                )
            }
            <Avatar
                size="md"
                name="Cainan Luyles"
                src='https://github.com/CainanL.png'
            />
        </Flex>
    )
}