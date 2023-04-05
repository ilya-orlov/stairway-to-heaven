import { Injectable } from '@nestjs/common'
import { Pool } from 'pg'

const pool = new Pool()
@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const { rows } = await pool.query('SELECT NOW()')

    return 'Stairway to heaven!' + rows[0].now
  }
}
