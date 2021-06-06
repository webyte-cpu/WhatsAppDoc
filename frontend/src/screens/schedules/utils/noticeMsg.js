import React from "react";
import { View } from "react-native";
import { Card, Text, useTheme } from "@ui-kitten/components";
import { useAuth } from "../../auth/utils/authProvider";
import enums from "../../../../helpers/enums";
import customStyle from "../../../../themes/styles";
import { AppRoute } from "../../../navigation/app-routes";

//! for Doctors only
const NoticeMsg = ({ navigation }) => {
  const theme = useTheme()
  const { appState } = useAuth();
  const { user } = appState;
  const { PENDING, VERIFIED, UNVERIFIED, DECLINED } = enums.verificationStatus;

  console.log(user, 'user')
  const getNoticeMsg = (verificationStatus) => {
    let msg;

    switch (verificationStatus) {
      case PENDING:
        msg = "Please wait to be verified to make your clinics public. ";
        break;
      case UNVERIFIED:
        case DECLINED:
          msg = "Only verified doctors are allowed to make their clinics public. ";
          break;    
      default:
        console.error("NoticeMsg: Invalid verification status");
    }

    return msg;
  };

  return (
      <View style={{width: '100%', paddingVertical: 10, backgroundColor: theme['color-info-transparent-100'], borderBottomWidth: 1, borderBottomColor: theme['color-info-transparent-200']}}>
        <Text style={{color: theme['color-info-600'], textAlign: 'center'}}>{getNoticeMsg(user.verificationStatus)}
        {[UNVERIFIED, DECLINED].includes(user.verificationStatus) ? (
          <>
            Resend your request{" "}
            <Text
              testID="resendLink"
              category="s2"
              style={{ textDecorationLine: "underline", color: theme['color-info-700']}}
              accessibilityRole="button"
              onPress={() => navigation.navigate(AppRoute.DOCTOR_FORM)}
            >
              here.
            </Text>
          </>
        ) : (
          <></>
        )}
        </Text>
      </View>
  );
};

export default NoticeMsg;