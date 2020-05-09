import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListMonthAvailabilityService from './ListMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listMonthAvailability: ListMonthAvailabilityService;

describe('ListMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listMonthAvailability = new ListMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 9, 8, 0, 0),
      provider_id: 'user',
      user_id: 'client',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 9, 9, 0, 0),
      provider_id: 'user',
      user_id: 'client',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 9, 10, 0, 0),
      provider_id: 'user',
      user_id: 'client',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 9, 11, 0, 0),
      provider_id: 'user',
      user_id: 'client',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 9, 12, 0, 0),
      provider_id: 'user',
      user_id: 'client',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 9, 13, 0, 0),
      provider_id: 'user',
      user_id: 'client',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 9, 14, 0, 0),
      provider_id: 'user',
      user_id: 'client',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 9, 15, 0, 0),
      provider_id: 'user',
      user_id: 'client',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 9, 16, 0, 0),
      provider_id: 'user',
      user_id: 'client',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 9, 17, 0, 0),
      provider_id: 'user',
      user_id: 'client',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 11, 8, 0, 0),
      provider_id: 'user',
      user_id: 'client',
    });

    const availability = await listMonthAvailability.execute({
      provider_id: 'user',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 9, available: false },
        { day: 11, available: true },
      ]),
    );
  });
});
