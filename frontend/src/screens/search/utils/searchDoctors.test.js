import doctors from './data';
import { getByLocationString, getByName, getNearbyDoctors } from './searchDoctors';

let verifiedDoctors;

beforeAll(() => {
  const getVerifiedDoctors = (doctors) => doctors.filter((doctor) => doctor.verificationStatus === "VERIFIED")
  verifiedDoctors = getVerifiedDoctors(doctors)
})

describe('get nearby doctors', () => {
  const userLocation = { latitude: 10.723633, longitude: 122.557646 } // JARO PLAZA

  it('returns doctors with clinic/s within 1 KM from user location', () => {
    expect(getNearbyDoctors(userLocation, verifiedDoctors, 1)).toEqual([doctors[0]])
  })

  it('returns doctors with clinic/s within 3KM from user location', () => {
    expect(getNearbyDoctors(userLocation, verifiedDoctors, 3)).toEqual([doctors[0], doctors[2], doctors[3]])
  })

  it('returns doctors with clinic/s within 100KM from user location', () => {
    expect(getNearbyDoctors(userLocation, verifiedDoctors, 100)).toEqual([doctors[0], doctors[2], doctors[3]])
  })
})

describe('get doctors with matching clinic/s address to query address', () => {
  it('returns doctors with clinic/s that has one of the following: "PHILIPPINES"', () => {
    expect(getByLocationString('PHILIPPINES', verifiedDoctors)).toEqual([doctors[0], doctors[2], doctors[3]])
  })

  it('returns doctors with clinic/s that has one of the following: "Roxas"', () => {
    expect(getByLocationString('Roxas', verifiedDoctors)).toEqual([doctors[2]])
  })

  it('returns doctors with clinic/s that has one of the following: "Qualimed, Iloilo City"', () => {
    expect(getByLocationString('Qualimed, Iloilo City', verifiedDoctors)).toEqual([doctors[0], doctors[2], doctors[3]])
  })

  it('returns doctors with clinic/s that has one of the following: "Western, Iloilo City, Iloilo"', () => {
    expect(getByLocationString('Western, Iloilo City, Iloilo', verifiedDoctors)).toEqual([doctors[0], doctors[2], doctors[3]])
  })
})

describe('get doctors with matching name to query', () => {
  it('returns doctors matching name to: "Laura"', () => {
    expect(getByName('Laura', verifiedDoctors)).toEqual([doctors[2], doctors[3]])
  })

  it('returns doctors matching name to: "Marvin"', () => {
    expect(getByName('Marvin', verifiedDoctors)).toEqual([])
  })
})