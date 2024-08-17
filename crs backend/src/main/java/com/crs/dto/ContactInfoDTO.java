package com.crs.dto;

public class ContactInfoDTO {
    
	private Long id;
    private String firstName;
    private String lastName;
    private String contactNumber;
    private String emailAddress;
    private String reasonOfContact;

    // Getters and Setters
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getReasonOfContact() {
        return reasonOfContact;
    }

    public void setReasonOfContact(String reasonOfContact) {
        this.reasonOfContact = reasonOfContact;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
}
