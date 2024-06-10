import { ValueObject } from './common/valueObject'

export interface AuthProps {
  accessToken: string
  refreshToken: string
}

export class Auth extends ValueObject<AuthProps> {
  constructor(props: AuthProps) {
    super(props)
  }

  get accessToken(): string {
    return this.props.accessToken
  }

  get refreshToken(): string {
    return this.props.refreshToken
  }
}
