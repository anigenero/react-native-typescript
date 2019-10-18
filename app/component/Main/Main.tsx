import * as React from 'react';
import { FunctionComponent, useEffect } from 'react';
import { LocalizeContextProps, MissingTranslationOptions, withLocalize } from 'react-localize-redux';
import { Text, View } from 'react-native';
import { Theme, withTheme } from 'react-native-paper';
import { getLogger } from '../../util/log.util';
import { mainStyles } from './Main.style';

const enLocale = require('../../assets/locale/en-US.json');

const _log = getLogger('Main');

type MainComponentProps = LocalizeContextProps & { theme: Theme };
export const Main: FunctionComponent<MainComponentProps> = ({addTranslationForLanguage, initialize, theme}) => {

    useEffect(() => {

        initialize({
            languages: [{
                code: 'en-US',
                name: 'English (US)'
            }],
            options: {
                defaultLanguage: 'en-US',
                ignoreTranslateChildren: false,
                renderInnerHtml: false,
                renderToStaticMarkup: false,
                onMissingTranslation: (options: MissingTranslationOptions) => {

                    const {translationId, languageCode} = options;
                    _log.warn('Could not find translation for {} of {}', translationId, languageCode);

                    return translationId;

                }
            }
        });

        addTranslationForLanguage(enLocale, 'en-US');

    }, []);

    const styles = mainStyles(theme);

    return (
        <View style={styles.root}>
            <Text style={styles.text}>Hello, World!</Text>
        </View>
    );

};

export default withTheme(withLocalize(Main));
