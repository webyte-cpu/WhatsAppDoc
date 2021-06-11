import { gql } from "@apollo/client";

export const GET_DOCTORS = gql`
  query {
    getAllDoctor {
      uid
      firstName
      middleName
      lastName
      birthdate
      licenceNum
      licenceExp
      licenceImg
      verificationStatus
      specialization
      pushToken
    }
  }
`;

export const UPDATE_DOCTOR = gql`
  mutation updateDoctor(
    $uid: UUID!
    $verificationStatus: VerificationStatus
    $description: String!
  ) {
    updateDoctor(uid: $uid, verificationStatus: $verificationStatus) {
      uid
      verificationStatus
    }

    notify(
      userUid: $uid
      title: "Verification"
      sourceType: "VERIFICATION"
      description: $description
    ) {
      uid
    }
  }
`;
