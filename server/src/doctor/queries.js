import { gql } from "apollo-server-express";

export const VERIFY_DOCTORS = gql`
  mutation updateDoctor($uid: UUID!, $verificationStatus: VerificationStatus) {
    updateDoctor(uid: $uid, verificationStatus: $verificationStatus) {
      uid
    }
  }
`;
