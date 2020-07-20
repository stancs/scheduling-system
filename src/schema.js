const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar Date
    scalar Time
    scalar DateTime
    scalar JSON

    type Patient {
        id: ID!
        userName: String
        firstName: String!
        middleName: String
        lastName: String!
        email: String
        phone: String
        ssn: String
        addressLine1: String
        addressLine2: String
        city: String
        state: String
        county: String
        zipCode: String
        isSmoker: Boolean
        birthday: String
    }

    type Provider {
        id: ID!
        userName: String
        firstName: String!
        middleName: String
        lastName: String!
        degree: String
        email: String
        phone: String
        addressLine1: String
        addressLine2: String
        city: String
        state: String
        county: String
        zipCode: String
        isAcceptingNewPatient: Boolean
        languagesSpoken: JSON
        npi: String
        education: Education
        biography: String
        affiliation: Affiliation
        regularShift: JSON
        # regularShifts
        # {
        #   Monday: [
        #       {
        #         start: String! # HH:MM (24hr)
        #         end: String!   # HH:MM (24hr)
        #       },
        #       {
        #         start: String! # HH:MM (24hr)
        #         end: String!   # HH:MM (24hr)
        #       }
        #   ],
        #   Tuesday: {
        #     ...
        #   },
        #   ...
        # }
        scheduledShifts: [ScheduledShift]
        blockedShifts: [ScheduledShift]
        # Time zone
        # Should get it from console.log(Intl.DateTimeFormat().resolvedOptions().timeZone) in browser side
        # https://stackoverflow.com/questions/1091372/getting-the-clients-timezone-offset-in-javascript
        timeZone: String!
    }

    type ScheduledShift {
        startDate: String! # YYYY-MM-DD
        endDate: String! # YYYY-MM-DD
        shift: JSON
        # regularShifts
        # {
        #  Monday: [
        #       {
        #         start: String! # HH:MM (24hr)
        #         end: String!   # HH:MM (24hr)
        #       },
        #       {
        #         start: String! # HH:MM (24hr)
        #         end: String!   # HH:MM (24hr)
        #       }
        #   ],
        #   Tuesday: {
        #     ...
        #   },
        #   ...
        # }
    }

    type Education {
        medicalSchool: String
        residency: String
    }

    type Affiliation {
        medicalGroup: String
        hospital: String
    }

    type Appointment {
        id: ID!
        patient: ID!
        provider: ID!
        startDateTime: DateTime # Should get it from DateObject.toISOString()
        endDateTime: DateTime # Should get it from DateObject.toISOString()
        location: String
        room: String
    }

    type AppointmentExtended {
        id: ID!
        patient: Patient
        provider: Provider
        startDateTime: DateTime # Should get it from DateObject.toISOString()
        endDateTime: DateTime # Should get it from DateObject.toISOString()
        location: String
        room: String
    }

    type DeleteResult {
        isSuccess: Boolean
        deletedCount: Int
    }

    type Query {
        getPatients: [Patient]
        getPatientById(id: ID!): Patient
        getProviders: [Provider]
        getProviderById(id: ID!): Provider
        getAppointmentById(id: ID!): AppointmentExtended
        getAppointmentsByPeriod(startDateTime: DateTime, endDateTime: DateTime): [AppointmentExtended]
        getAppointmentsByProvider(
            providerId: ID!
            startDateTime: DateTime
            endDateTime: DateTime
        ): [AppointmentExtended]
        getAppointmentsByPatient(patientId: ID!, startDateTime: DateTime, endDateTime: DateTime): [AppointmentExtended]
    }

    input PatientInput {
        userName: String!
        firstName: String!
        middleName: String
        lastName: String!
        email: String
        phone: String
        ssn: String
        addressLine1: String
        addressLine2: String
        city: String
        state: String
        county: String
        zipCode: String
        isSmoker: Boolean
        birthday: String
    }

    input ProviderInput {
        userName: String!
        firstName: String!
        middleName: String
        lastName: String!
        email: String
        phone: String
        addressLine1: String
        addressLine2: String
        city: String
        state: String
        county: String
        zipCode: String
        isAcceptingNewPatient: Boolean
        languagesSpoken: [String]
        npi: String
        education: EducationInput
        biography: String
        affiliation: AffiliationInput
        regularShift: JSON
        scheduledShifts: [ScheduledShiftInput]
        blockedShifts: [ScheduledShiftInput]
        timeZone: String!
    }

    input EducationInput {
        medicalSchool: String
        residency: String
    }

    input AffiliationInput {
        medicalGroup: String
        hospital: String
    }

    input ScheduledShiftInput {
        startDate: String! # YYYY-MM-DD
        endDate: String! # YYYY-MM-DD
        shift: JSON
    }

    input AppointmentInput {
        patient: String!
        provider: String!
        startDateTime: DateTime
        endDateTime: DateTime
        location: String
        room: String
    }

    type Mutation {
        addPatient(input: PatientInput): Patient
        addProvider(input: ProviderInput): Provider
        addAppointment(input: AppointmentInput): Appointment
        updateAppointment(id: ID!): Appointment
        cancelAppointment(id: ID!): DeleteResult
        removePatient(id: ID!): DeleteResult
        removeProvider(id: ID!): DeleteResult
        updatePatient(id: ID!, input: PatientInput): Patient
        updateProvider(id: ID!, input: ProviderInput): Provider
    }
`;

module.exports = typeDefs;