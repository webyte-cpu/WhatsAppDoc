import getDistanceBetweenPoints from "../../../components/maps/helpers/distance.js";
import * as R from 'ramda';

//? returns doctors with clinic/s within scopeLimitKM
export const getNearbyDoctors = (userLocation, verifiedDoctors, scopeLimitKM) => {
    const hasClinicsDoctors = verifiedDoctors.filter((doctor) => doctor.clinic != null)
    const nearbyDoctors = hasClinicsDoctors.filter((doctor) => {

        const nearbyClinics = doctor.clinic.filter((clinic) => {
            const [latitude, longitude] = clinic.address.coordinates.split(',').map((coor) => Number(coor))
            let totalDistance = getDistanceBetweenPoints(userLocation["latitude"], userLocation["longitude"], latitude, longitude)
            clinic["totalDistance"] = totalDistance

            return totalDistance <= scopeLimitKM
        })
        return nearbyClinics.length > 0
    })
    return nearbyDoctors
}

//? returns doctors with clinic/s that matches the query address string
export const getByLocationString = (queryAddress, verifiedDoctors) => {
    const hasClinicsDoctors = verifiedDoctors.filter((doctor) => doctor.clinic != null)
    const includedDoctors = hasClinicsDoctors.filter((doctor) => {
  
        const matchClinics = doctor.clinic.filter((clinic) => {
            const queryAddressString = queryAddress.toUpperCase().split(',')
            const clinicAddress = {
                clinicName: clinic.name,
                address: clinic.address.address,
                city: clinic.address.city,
                province: clinic.address.province,
                country: clinic.address.country,
                zipCode: clinic.address.zipCode
            }

            const clinicAddressString = Object.values(clinicAddress).join(', ').toUpperCase()
            return queryAddressString.some((address) => clinicAddressString.includes(address))
        })
        return matchClinics.length > 0
    })
    return includedDoctors
  }

export const getByName = (query, verifiedDoctors) => {
    const hasClinicsDoctors = verifiedDoctors.filter((doctor) => doctor.clinic != null)
    const includedDoctors = hasClinicsDoctors.filter((doctor) => {
        const doctorName = (`${doctor.firstName} ${doctor.middleName} ${doctor.lastName}`).toUpperCase();
        const queryName = query.toUpperCase()
        
        return doctorName.includes(queryName)
    })
    return includedDoctors
}
