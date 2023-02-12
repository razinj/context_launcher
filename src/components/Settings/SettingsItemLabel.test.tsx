import { renderWithProvider } from '../../../utils/test/utils'
import { SettingsItemLabelProps } from '../../models/props'
import SettingsItemLabel from './SettingsItemLabel'

describe('<SettingsItemLabel /> Tests', () => {
  const requiredProps: SettingsItemLabelProps = {
    title: 'An item label',
  }

  it('should render correctly and match snapshot - required props', () => {
    expect(renderWithProvider(<SettingsItemLabel {...requiredProps} />).toJSON()).toMatchSnapshot()
  })

  it('should render correctly and match snapshot - required and optional props', () => {
    const allProps: SettingsItemLabelProps = {
      ...requiredProps,
      description: 'An item description',
    }

    expect(renderWithProvider(<SettingsItemLabel {...allProps} />).toJSON()).toMatchSnapshot()
  })
})
