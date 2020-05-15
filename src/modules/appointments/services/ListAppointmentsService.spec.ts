import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListAppointmentsService from './ListAppointmentsService';

let listAppointments: ListAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listAppointments = new ListAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 11, 14, 0, 0),
      provider_id: 'provider',
      user_id: 'client',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 11, 15, 0, 0),
      provider_id: 'provider',
      user_id: 'client',
    });

    const appointments = await listAppointments.execute({
      provider_id: 'provider',
      day: 11,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
