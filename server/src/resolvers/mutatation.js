const mutation = {
  createAdmin: async (hello) => {
    console.log(hello);
  },
  createUser: () => "here lies the users datas",
  createDoctor: () => "here lies the docotrs datas",
  createPatient: () => "here lies the patient datas",
};

export default mutation;
