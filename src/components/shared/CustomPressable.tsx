import { ReactNode } from 'react'
import { Pressable, PressableProps } from 'react-native'

interface CustomPressableProps extends PressableProps {
  children: ReactNode
}

const CustomPressable = ({ children, ...pressableProps }: CustomPressableProps) => {
  return (
    <Pressable android_disableSound={true} {...pressableProps}>
      {children}
    </Pressable>
  )
}

export default CustomPressable
