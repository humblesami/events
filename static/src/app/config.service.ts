import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    public site_config = window['site_config'];
}