/**
 * @class Parameters
 * @classdesc Static class for Reportal parameter components
 */
class Parameters{

    /**
     * @memberof Parameters
     * @function TA_LEVEL_Domain
     * @param {Object} context - {component: parameter, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function TA_LEVEL_Domain(context){
        new TAParameters(TAHelper.GetGlobals(context),Config.GetTALibrary()).RenderLevelsParameter(context.component, null);
    }

    /**
     * @memberof Parameters
     * @function TA_COMPARE_PERIODS_Domain
     * @param {Object} context - {component: parameter, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function TA_COMPARE_PERIODS_Domain(context){
        var parameterValues = [
            {Code: "wow", Label: "Current vs Last Week"},
            {Code: "qoq", Label: "Current vs Last Quarter"},
            {Code: "mom", Label: "Current vs Last Month"},
            {Code: "yoy", Label: "Current vs Last Year"}
        ];
        new ParameterUtilities(TAHelper.GetGlobals(context)).LoadParameterValues(context.component, parameterValues);
    }

    /**
     * @memberof Parameters
     * @function TA_TOP_CATEGORIES_SINGLE_Domain
     * @param {Object} context - {component: parameter, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function TA_TOP_CATEGORIES_SINGLE_Domain(context){
        new TAParameters(TAHelper.GetGlobals(context),Config.GetTALibrary()).RenderLevelCategoriesParameter(context.component, null, 0, "-select-")
    }

    /**
     * @memberof Parameters
     * @function TA_SUB_CATEGORIES_SINGLE_Domain
     * @param {Object} context - {component: parameter, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function TA_SUB_CATEGORIES_SINGLE_Domain(context){
        new TAParameters(TAHelper.GetGlobals(context),Config.GetTALibrary()).RenderLevelCategoriesParameter(context.component, null, 1, "-select-")
    }

    /**
     * @memberof Parameters
     * @function TA_ATTRIBUTES_SINGLE_Domain
     * @param {Object} context - {component: parameter, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function TA_ATTRIBUTES_SINGLE_Domain(context){
        new TAParameters(TAHelper.GetGlobals(context),Config.GetTALibrary()).RenderLevelCategoriesParameter(context.component, null, 2, "-select-")
    }

    /**
     * @memberof Parameters
     * @function TA_SUB_CATEGORIES_SINGLE_Mask
     * @param {Object} context - {component: mask, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function TA_SUB_CATEGORIES_SINGLE_Mask(context){
        var category = context.state.Parameters.GetString("TA_TOP_CATEGORIES_SINGLE");
        if(category && category != "emptyv")
            new TAParameters(TAHelper.GetGlobals(context),Config.GetTALibrary()).MaskSelectedCategoryChildren(context.component,null,category,true)
    }

    /**
     * @memberof Parameters
     * @function TA_ATTRIBUTES_SINGLE_Mask
     * @param {Object} context - {component: mask, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function TA_ATTRIBUTES_SINGLE_Mask(context){
        var category = context.state.Parameters.GetString("TA_SUB_CATEGORIES_SINGLE");
        if(category && category != "emptyv")
            new TAParameters(TAHelper.GetGlobals(context),Config.GetTALibrary()).MaskSelectedCategoryChildren(context.component,null,category,true)
    }

    /**
     * @memberof Parameters
     * @function TA_VIEW_SENTIMENT_Domain
     * @param {Object} context - {component: parameter, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function TA_VIEW_SENTIMENT_Domain(context){
        var parameterValues = [
            {Code: "emptyv", Label: "All sentiments"},
            {Code: "pos", Label: "Positive"},
            {Code: "neu", Label: "Neutral"},
            {Code: "neg", Label: "Negative"}
        ]
        new ParameterUtilities(TAHelper.GetGlobals(context)).LoadParameterValues(context.component, parameterValues);
    }

    /**
     * @memberof Parameters
     * @function TA_DISTRIBUTION_TOGGLE_Domain
     * @param {Object} context - {component: parameter, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function TA_DISTRIBUTION_TOGGLE_Domain(context){
        var parameterValues = [
            {Code: 0, Label: "Count"},
            {Code: 1, Label: "%"}
        ]

        new ParameterUtilities(TAHelper.GetGlobals(context)).LoadParameterValues(context.component, parameterValues);
    }

    /**
     * @memberof Parameters
     * @function TA_VIEW_BY_Domain
     * @param {Object} context - {component: parameter, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function TA_VIEW_BY_Domain(context){
        new TAParameters(TAHelper.GetGlobals(context),Config.GetTALibrary()).RenderViewByParameter(context.component, null, "-select-");
    }

    /**
     * @memberof Parameters
     * @function TA_HIDE_EMPTY_ROWS_Domain
     * @param {Object} context - {component: parameter, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function TA_HIDE_EMPTY_ROWS_Domain(context){
        var parameterValues = [
            {Code: "hide", Label: "Hide categories with no hits"}
        ]
        new ParameterUtilities(TAHelper.GetGlobals(context)).LoadParameterValues(context.component, parameterValues);
    }

    /**
     * @memberof Parameters
     * @function FILTER_Domain
     * @param {Object} context - {component: parameter, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     * @param {Number} filterNumber
     */
    static function FILTER_Domain(context, filterNumber){
        var filterComponents = new FilterComponents(TAHelper.GetGlobals(context), Config.GetTALibrary().GetFilterQuestions(), Config.DS_Main);
        var filterQuestion = filterComponents.GetFilterQuestion(filterNumber -1 );
        if(filterQuestion){
            var parameterValues = [];
            var answers = filterQuestion.GetAnswers()
            for( var i = 0; i < answers.length; i++){
                parameterValues.push({
                    Code: answers[i].Precode,
                    Label: answers[i].Text
                });
            }
            new ParameterUtilities(TAHelper.GetGlobals(context)).LoadParameterValues(context.component, parameterValues);
        }
    }
}