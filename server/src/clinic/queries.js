import { gql } from 'apollo-server-express';

export const GET_CLINIC = gql`
  query GetClinic($uid: UUID, $doctorUid: UUID) {
    getClinic(uid: $uid, doctorUid: $doctorUid) {
      uid
      doctorClinicUid
      name
      roomNumber
    }
  }
`;

export const CREATE_CLINIC = gql`
  mutation CreateClinic(
    $doctorUid: UUID!,
    $name: String!,
    $roomNumber: String!,
    $address: AddressInput!,
    $minimumSchedulingNoticeMins: Int!,
    $slotDurationInMins: Int!,
    $consultationFee: Int
  ) {
    createClinic(
      doctorUid: $doctorUid,
      name: $name,
      roomNumber: $roomNumber,
      address: $address,
      minimumSchedulingNoticeMins: $minimumSchedulingNoticeMins,
      slotDurationInMins: $slotDurationInMins,
      consultationFee: $consultationFee
    ) {
      uid
      doctorClinicUid
      name
      roomNumber
    }
  }
`;

export const UPDATE_CLINIC = gql`
  mutation UpdateClinic(
    $uid: UUID!,
    $name: String,
    $roomNumber: String,
    $address: AddressInput,
    $minimumSchedulingNoticeMins: Int,
    $slotDurationInMins: Int,
    $consultationFee: Int
  ) {
    updateClinic(
      uid: $uid,
      name: $name,
      roomNumber: $roomNumber,
      address: $address,
      minimumSchedulingNoticeMins: $minimumSchedulingNoticeMins,
      slotDurationInMins: $slotDurationInMins,
      consultationFee: $consultationFee
    ) {
      uid
      doctorClinicUid
      name
      roomNumber
    }
  }
` 

export const DELETE_CLINIC = gql`
  mutation DeleteClinic($uid: UUID!){
    deleteClinic(uid: $uid) {
      uid
      doctorClinicUid
      name
      roomNumber
    }
  }
`