const { expect } = require('@playwright/test');
class UpdateProfile {
    constructor(page) {
        this.page = page;
        this.updateProfileLink = page.getByRole('link', { name: 'Update Contact Info' });
        this.pageTitile = page.locator('#updateProfileForm h1.title');
        this.phoneNumber = page.locator('[name="customer.phoneNumber"]');
        this.street = page.locator('[name="customer.address.street"]');
        this.city = page.locator('[name="customer.address.city"]');
        this.updateButton = page.getByRole('Button', { name: 'Update Profile' });
        this.ProfileUpdated= page.locator('#updateProfileResult h1.title');
    }
    async getUpdateProfilePage() {
        await this.updateProfileLink.click();
        await expect(this.pageTitile).toHaveText('Update Profile');
        await expect(this.phoneNumber).not.toHaveValue('');

    }
    async updateContactInfo(userData) {
        const updatedaddress = userData.address + 'y';
        const updatedCity = userData.updatedCity;
        await this.street.fill(updatedaddress);
        await this.city.clear();
        await this.city.pressSequentially(updatedCity);
    }
    async updateProfile(){
        await this.updateButton.click();
        await expect(this.ProfileUpdated).toHaveText('Profile Updated');
        await expect(this.ProfileUpdated).toBeVisible('Profile Updated')

    }
}
module.exports = UpdateProfile;