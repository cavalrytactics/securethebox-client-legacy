import {AcademyAppConfig} from './academy/AcademyAppConfig';
import {ChallengeCreatorAppConfig} from './securethebox/challenge-creator/ChallengeCreatorAppConfig';
import {AppCreatorAppConfig} from './securethebox/app-creator/AppCreatorAppConfig';
import {SubscriptionConfig} from './securethebox/subscription/SubscriptionConfig';

export const appsConfigs = [
    SubscriptionConfig,
    ChallengeCreatorAppConfig,
    AppCreatorAppConfig,
    AcademyAppConfig
];
