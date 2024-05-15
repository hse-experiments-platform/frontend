import styled from "styled-components";
import { motion } from "framer-motion"
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import ScrollContainer from "./scroll/ScrollElements";

export interface DropdownMenuOption {
    icon: JSX.Element;
    name: string;
    onClick: (id: string, name: string) => void;
    color?: string;
}

export interface DropdownMenuProps {
    item: any;
    trigger: JSX.Element;
    options: DropdownMenuOption[];
}

const Trigger = styled(Dropdown.Trigger)`
    border: none;
    background-color: transparent;
`

const Content = styled(Dropdown.Content)`
    min-width: 220px;
    background-color: white;
    border-radius: 6px;
    padding: 5px;
    box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`

const Item = styled(Dropdown.Item)<{color?: string}>`
    height: 30px;
    font-size: 15px;
    line-height: 1;
    border-radius: 3px;
    display: flex;
    align-items: center;
    color: ${props => props.color ?? "#03256C"};
    
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
`;

const AnimatedItem = ({children}: {children: JSX.Element}) => {
    return (
        <motion.div
                whileHover={{
                backgroundColor: "#D3D3D3",
                transition: { duration: 0 },
            }}
        >
            {children}
        </motion.div>
    )
}

export const DropdownMenu = ({trigger, options, item}: DropdownMenuProps) => {

    return (
        <Dropdown.Root>
            <Trigger>{trigger}</Trigger>

            <Dropdown.Portal>
                <Content side="right">
                    <ScrollContainer>
                        {options.map(option =>
                            <AnimatedItem key={option.name}>
                                <Item
                                    onClick={() => option.onClick(item.id, item.name)}
                                    color={option.color}
                                >
                                    {option.name}
                                    {option.icon}
                                </Item>
                            </AnimatedItem>
                        )}
                    </ScrollContainer>
                </Content>
            </Dropdown.Portal>
        </Dropdown.Root>
    )
}