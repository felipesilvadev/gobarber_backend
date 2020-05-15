import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listAppointments = container.resolve(ListAppointmentsService);

    const appointments = await listAppointments.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}
