'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Simon para Ionic</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Escribe para buscar"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Comenzando</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Descripción general
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencias
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Propiedades
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Módulos</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-e334771e5999957721a197758a3c49dfa4236687d3429db202417a349f1aaf47bf480bd1589c99098d0021dc87e758ce696ce13804659ef03014e210832dd635"' : 'data-target="#xs-components-links-module-AppModule-e334771e5999957721a197758a3c49dfa4236687d3429db202417a349f1aaf47bf480bd1589c99098d0021dc87e758ce696ce13804659ef03014e210832dd635"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-e334771e5999957721a197758a3c49dfa4236687d3429db202417a349f1aaf47bf480bd1589c99098d0021dc87e758ce696ce13804659ef03014e210832dd635"' :
                                            'id="xs-components-links-module-AppModule-e334771e5999957721a197758a3c49dfa4236687d3429db202417a349f1aaf47bf480bd1589c99098d0021dc87e758ce696ce13804659ef03014e210832dd635"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-e334771e5999957721a197758a3c49dfa4236687d3429db202417a349f1aaf47bf480bd1589c99098d0021dc87e758ce696ce13804659ef03014e210832dd635"' : 'data-target="#xs-injectables-links-module-AppModule-e334771e5999957721a197758a3c49dfa4236687d3429db202417a349f1aaf47bf480bd1589c99098d0021dc87e758ce696ce13804659ef03014e210832dd635"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e334771e5999957721a197758a3c49dfa4236687d3429db202417a349f1aaf47bf480bd1589c99098d0021dc87e758ce696ce13804659ef03014e210832dd635"' :
                                        'id="xs-injectables-links-module-AppModule-e334771e5999957721a197758a3c49dfa4236687d3429db202417a349f1aaf47bf480bd1589c99098d0021dc87e758ce696ce13804659ef03014e210832dd635"' }>
                                        <li class="link">
                                            <a href="injectables/LanguageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LanguageService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StorageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StorageService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link" >ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentsModule-8901b7af5535ecfa2e868c001e53cea919ed91446099490085c501cf7785d3680ef2e4ce1337ad404944148a0fd88ccc92015be36d5055d41b626492f5f5922f"' : 'data-target="#xs-components-links-module-ComponentsModule-8901b7af5535ecfa2e868c001e53cea919ed91446099490085c501cf7785d3680ef2e4ce1337ad404944148a0fd88ccc92015be36d5055d41b626492f5f5922f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-8901b7af5535ecfa2e868c001e53cea919ed91446099490085c501cf7785d3680ef2e4ce1337ad404944148a0fd88ccc92015be36d5055d41b626492f5f5922f"' :
                                            'id="xs-components-links-module-ComponentsModule-8901b7af5535ecfa2e868c001e53cea919ed91446099490085c501cf7785d3680ef2e4ce1337ad404944148a0fd88ccc92015be36d5055d41b626492f5f5922f"' }>
                                            <li class="link">
                                                <a href="components/CommonHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommonHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GamePageModule.html" data-type="entity-link" >GamePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GamePageModule-142ae31faed5d8f5441a3c0618e2534b39344e78742d907541eb0bb7ea9358b74471fb5e76c3e3b94761952483295aff1f979004eae7de39a6a1130ecf71d458"' : 'data-target="#xs-components-links-module-GamePageModule-142ae31faed5d8f5441a3c0618e2534b39344e78742d907541eb0bb7ea9358b74471fb5e76c3e3b94761952483295aff1f979004eae7de39a6a1130ecf71d458"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GamePageModule-142ae31faed5d8f5441a3c0618e2534b39344e78742d907541eb0bb7ea9358b74471fb5e76c3e3b94761952483295aff1f979004eae7de39a6a1130ecf71d458"' :
                                            'id="xs-components-links-module-GamePageModule-142ae31faed5d8f5441a3c0618e2534b39344e78742d907541eb0bb7ea9358b74471fb5e76c3e3b94761952483295aff1f979004eae7de39a6a1130ecf71d458"' }>
                                            <li class="link">
                                                <a href="components/GamePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GamePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GamePageRoutingModule.html" data-type="entity-link" >GamePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HelpPageModule.html" data-type="entity-link" >HelpPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HelpPageModule-0701dac6c7bb2bb9e23ae7d9be12510d3277bbb85dc7812d861cc66513e9cf92de02f82142dbc257a2b7e6a88c44056904c400c59ee22a31d61c32537293ada5"' : 'data-target="#xs-components-links-module-HelpPageModule-0701dac6c7bb2bb9e23ae7d9be12510d3277bbb85dc7812d861cc66513e9cf92de02f82142dbc257a2b7e6a88c44056904c400c59ee22a31d61c32537293ada5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HelpPageModule-0701dac6c7bb2bb9e23ae7d9be12510d3277bbb85dc7812d861cc66513e9cf92de02f82142dbc257a2b7e6a88c44056904c400c59ee22a31d61c32537293ada5"' :
                                            'id="xs-components-links-module-HelpPageModule-0701dac6c7bb2bb9e23ae7d9be12510d3277bbb85dc7812d861cc66513e9cf92de02f82142dbc257a2b7e6a88c44056904c400c59ee22a31d61c32537293ada5"' }>
                                            <li class="link">
                                                <a href="components/AboutPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HelpPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HelpPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HowPlayPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HowPlayPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelpPageRoutingModule.html" data-type="entity-link" >HelpPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomePageModule-b2d25ad22107c02a1d798503330b9664e010816c3e20a72be02c9f606799548abf9f1db7bc11761c180bd0bc2e1da5c3337e65b9a21624a3b3d0c8ccd9c03b49"' : 'data-target="#xs-components-links-module-HomePageModule-b2d25ad22107c02a1d798503330b9664e010816c3e20a72be02c9f606799548abf9f1db7bc11761c180bd0bc2e1da5c3337e65b9a21624a3b3d0c8ccd9c03b49"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-b2d25ad22107c02a1d798503330b9664e010816c3e20a72be02c9f606799548abf9f1db7bc11761c180bd0bc2e1da5c3337e65b9a21624a3b3d0c8ccd9c03b49"' :
                                            'id="xs-components-links-module-HomePageModule-b2d25ad22107c02a1d798503330b9664e010816c3e20a72be02c9f606799548abf9f1db7bc11761c180bd0bc2e1da5c3337e65b9a21624a3b3d0c8ccd9c03b49"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PlayersPageModule.html" data-type="entity-link" >PlayersPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PlayersPageModule-e818cbbfaa25cdde247daa84b0c77df73b1dac130bf74db982f6caec389b3ee9ca4563cc38e1f01f384558a4339c2b76ce881725e92f338ba0c0235b3250ddcc"' : 'data-target="#xs-components-links-module-PlayersPageModule-e818cbbfaa25cdde247daa84b0c77df73b1dac130bf74db982f6caec389b3ee9ca4563cc38e1f01f384558a4339c2b76ce881725e92f338ba0c0235b3250ddcc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PlayersPageModule-e818cbbfaa25cdde247daa84b0c77df73b1dac130bf74db982f6caec389b3ee9ca4563cc38e1f01f384558a4339c2b76ce881725e92f338ba0c0235b3250ddcc"' :
                                            'id="xs-components-links-module-PlayersPageModule-e818cbbfaa25cdde247daa84b0c77df73b1dac130bf74db982f6caec389b3ee9ca4563cc38e1f01f384558a4339c2b76ce881725e92f338ba0c0235b3250ddcc"' }>
                                            <li class="link">
                                                <a href="components/ListPlayersPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListPlayersPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewPlayerPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewPlayerPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlayersPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlayersPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlayersPageRoutingModule.html" data-type="entity-link" >PlayersPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ScoresPageModule.html" data-type="entity-link" >ScoresPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ScoresPageModule-8d0f952642c45807e57508f11c773f76f0c219e43bd6886991cc8b96b09f1964d6dd9879d6cdcae680cecb627df90d7252224892bfcd08bfa70a7502e30a3fbb"' : 'data-target="#xs-components-links-module-ScoresPageModule-8d0f952642c45807e57508f11c773f76f0c219e43bd6886991cc8b96b09f1964d6dd9879d6cdcae680cecb627df90d7252224892bfcd08bfa70a7502e30a3fbb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ScoresPageModule-8d0f952642c45807e57508f11c773f76f0c219e43bd6886991cc8b96b09f1964d6dd9879d6cdcae680cecb627df90d7252224892bfcd08bfa70a7502e30a3fbb"' :
                                            'id="xs-components-links-module-ScoresPageModule-8d0f952642c45807e57508f11c773f76f0c219e43bd6886991cc8b96b09f1964d6dd9879d6cdcae680cecb627df90d7252224892bfcd08bfa70a7502e30a3fbb"' }>
                                            <li class="link">
                                                <a href="components/ScoresListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScoresListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScoresPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScoresPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ScoresPageRoutingModule.html" data-type="entity-link" >ScoresPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsPageModule.html" data-type="entity-link" >SettingsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SettingsPageModule-6a99a846bcba2eb875f05de5e2d119ea62198960e157000f3b530efa4f4def1b4b4dfac65de95c8864de2954dbd5a6950c61acb7b279658689a542fecdbc0e39"' : 'data-target="#xs-components-links-module-SettingsPageModule-6a99a846bcba2eb875f05de5e2d119ea62198960e157000f3b530efa4f4def1b4b4dfac65de95c8864de2954dbd5a6950c61acb7b279658689a542fecdbc0e39"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsPageModule-6a99a846bcba2eb875f05de5e2d119ea62198960e157000f3b530efa4f4def1b4b4dfac65de95c8864de2954dbd5a6950c61acb7b279658689a542fecdbc0e39"' :
                                            'id="xs-components-links-module-SettingsPageModule-6a99a846bcba2eb875f05de5e2d119ea62198960e157000f3b530efa4f4def1b4b4dfac65de95c8864de2954dbd5a6950c61acb7b279658689a542fecdbc0e39"' }>
                                            <li class="link">
                                                <a href="components/SettingsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsPageRoutingModule.html" data-type="entity-link" >SettingsPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Clases</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/MockStorageService.html" data-type="entity-link" >MockStorageService</a>
                            </li>
                            <li class="link">
                                <a href="classes/TranslateServiceStub.html" data-type="entity-link" >TranslateServiceStub</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Inyectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppEffects.html" data-type="entity-link" >AppEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LanguageService.html" data-type="entity-link" >LanguageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlayersEffects.html" data-type="entity-link" >PlayersEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlayersService.html" data-type="entity-link" >PlayersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScoresEffects.html" data-type="entity-link" >ScoresEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScoresService.html" data-type="entity-link" >ScoresService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link" >StorageService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guardias</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RouteResolver.html" data-type="entity-link" >RouteResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppActionSheetButton.html" data-type="entity-link" >AppActionSheetButton</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppActionSheetConfirm.html" data-type="entity-link" >AppActionSheetConfirm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppActionSheetOptions.html" data-type="entity-link" >AppActionSheetOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppActionSheetResponse.html" data-type="entity-link" >AppActionSheetResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppAlertOptions.html" data-type="entity-link" >AppAlertOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link" >AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppToastOptions.html" data-type="entity-link" >AppToastOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AvatarListItem.html" data-type="entity-link" >AvatarListItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigLanguageItem.html" data-type="entity-link" >ConfigLanguageItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrentColorPlay.html" data-type="entity-link" >CurrentColorPlay</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GameState.html" data-type="entity-link" >GameState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HelpAboutLink.html" data-type="entity-link" >HelpAboutLink</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Player.html" data-type="entity-link" >Player</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlayerList.html" data-type="entity-link" >PlayerList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlayersState.html" data-type="entity-link" >PlayersState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScoreRecord.html" data-type="entity-link" >ScoreRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScoresInfo.html" data-type="entity-link" >ScoresInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScoresListItem.html" data-type="entity-link" >ScoresListItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScoreState.html" data-type="entity-link" >ScoreState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SlideData.html" data-type="entity-link" >SlideData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateLanguages.html" data-type="entity-link" >StateLanguages</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#pipes-links"' :
                                'data-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Tuberías</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/MockDatePipe.html" data-type="entity-link" >MockDatePipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/MockTranslatePipe.html" data-type="entity-link" >MockTranslatePipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscelánea</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Funciones</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Alias de tipo</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Rutas</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Cobertura de la documentación</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentación generada utilizando <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});