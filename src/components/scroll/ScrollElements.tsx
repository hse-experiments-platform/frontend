import styled from 'styled-components';
import * as ScrollArea from '@radix-ui/react-scroll-area';

const ScrollRoot = styled(ScrollArea.Root)`
    height: 100%;
    width: 100%;
    --scrollbar-size: 10px;
`

const ScrollViewport = styled(ScrollArea.Viewport)`
    width: 100%;
    height: 100%;
`

const Scrollbar = styled(ScrollArea.Scrollbar)`
    display: flex;
    user-select: none;
    touch-action: none;
    padding: 2px;
    transition: background 160ms ease-out;
    background: #EBEBEB;

    &[data-orientation='vertical'] {
        width: var(--scrollbar-size);
    }

    &[data-orientation='horizontal'] {
        height: var(--scrollbar-size);
        flex-direction: column;
    }
`

const ScrollThumb = styled(ScrollArea.Thumb)`
    flex: 1;
    background: #676767;
    border-radius: var(--scrollbar-size);
    position: relative;

    ::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        min-width: 44px;
        min-height: 44px;
    }
`

const ScrollContainer = ({children}: {children: any}) => {
    return (
        <ScrollRoot>
            <ScrollViewport>
                {children}
             </ScrollViewport>
            <Scrollbar orientation="horizontal">
                <ScrollThumb />
            </Scrollbar>
            <Scrollbar orientation="vertical">
                <ScrollThumb />
            </Scrollbar>
        </ScrollRoot>
    )
}

export default ScrollContainer;