import { ContactEntity } from '../../server/modules/contact/contact.entity';
import { CommonApi } from './internals/base.api';

class ContactApi extends CommonApi<ContactEntity> {

}

export const contactApi = new ContactApi('contact');
