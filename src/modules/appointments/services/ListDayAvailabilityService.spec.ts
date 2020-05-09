import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListDayAvailabilityService from './ListDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listDayAvailability: ListDayAvailabilityService;

describe('ListDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listDayAvailability = new ListDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 11, 14, 0, 0),
      provider_id: 'user',
      user_id: 'client',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 11, 15, 0, 0),
      provider_id: 'user',
      user_id: 'client',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 11, 11).getTime();
    });

    const availability = await listDayAvailability.execute({
      provider_id: 'user',
      day: 11,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
        { hour: 17, available: true },
      ]),
    );
  });
});
