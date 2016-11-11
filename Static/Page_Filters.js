/**
 * @class Page_filters
 * @classdesc Static class for Reportal Page filters components
 */
class Page_filters{
    private static var _filterComponents;
    private static var _folder;
    private static const _defaultParameters = [];

    /**
     * @memberof Page_filters
     * @function Hide
     * @description function to hide the page
     * @param {Object} context - {pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     * @returns {Boolean}
     */
    static function Hide(context){
        return false;
    }

    /**
     * @memberof Page_filters
     * @function Render
     * @description function to render the page
     * @param {Object} context - {component: page, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function Render(context){
        context.log.LogDebug("Page_Filters 1");

    context.log.LogDebug("Page_Filters 1/1");
    _filterComponents = new FilterComponents(TAHelper.GetGlobals(context), Config.GetTALibrary().GetFilterQuestions(), Config.DS_Main);
    context.log.LogDebug("Page_Filters 2");
    if(context.component.SubmitSource == "btnClearFilters"){
            _filterComponents.ClearFilters();
        }
    context.log.LogDebug("Page_Filters 3");
        if(context.component.SubmitSource == "btnClearDateFilter"){
            context.state.Parameters["TA_DATE_FROM"] = null;
            context.state.Parameters["TA_DATE_TO"] = null;
        }
    context.log.LogDebug("Page_Filters 4");
        var paramUtils = new ParameterUtilities(TAHelper.GetGlobals(context));
    context.log.LogDebug("Page_Filters 5");
        paramUtils.SetDefaultParameterValues(_defaultParameters);
    context.log.LogDebug("Page_Filters 6");
    Config.SetTALibrary(TAHelper.GetGlobals(context));
        _folder = Config.GetTALibrary().GetFolderById();
    context.log.LogDebug("Page_Filters 7");
    }

    /**
     * @memberof Page_filters
     * @function btnSaveReturn_Hide
     * @param {Object} context - {pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     * @returns {Boolean}
     */
    static function btnSaveReturn_Hide(context){
        return false
    }

    /**
     * @memberof Page_filters
     * @function btnSaveReturn_Render
     * @param {Object} context - {component: button, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function btnSaveReturn_Render(context){
        context.component.Label = new Label(9,"Save and Return");
        context.component.TargetPage = context.state.Parameters.GetString("TA_LAST_VISITED_PAGE");
    }

    /**
     * @memberof Page_filters
     * @function btnSave_Hide
     * @param {Object} context - {pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     * @returns {Boolean}
     */
    static function btnSave_Hide(context){
        return false
    }

    /**
     * @memberof Page_filters
     * @function btnSave_Render
     * @param {Object} context - {component: button, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function btnSave_Render(context){
        context.component.Label = new Label(9,"Save");
        context.component.TargetPage = "filters";
    }

    /**
     * @memberof Page_filters
     * @function btnClearFilters_Hide
     * @param {Object} context - {pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     * @returns {Boolean}
     */
    static function btnClearFilters_Hide(context){
        return false
    }

    /**
     * @memberof Page_filters
     * @function btnClearFilters_Render
     * @param {Object} context - {component: button, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     */
    static function btnClearFilters_Render(context){
    context.component.Label = new Label(9,"Clear Filters");
    context.component.TargetPage = "filters";
}

    /**
     * @memberof Page_filters
     * @function txtFilterTitle_Hide
     * @param {Object} context - {pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     * @param {Number} filterNumber
     * @returns {Boolean}
     */
    static function txtFilterTitle_Hide(context, filterNumber){
    var filterQuestion = _filterComponents.GetFilterQuestion(filterNumber-1);
        return !filterQuestion
    }

    /**
     * @memberof Page_filters
     * @function txtFilterTitle_Render
     * @param {Object} context - {component: text, pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     * @param {Number} filterNumber
     */
    static function txtFilterTitle_Render(context, filterNumber){
    var filterTitle = _filterComponents.GetFilterTitle(filterNumber-1);
    if(filterTitle)
        context.component.Output.Append(filterTitle);
    }

    /**
     * @memberof Page_filters
     * @function lstFilterList_Hide
     * @param {Object} context - {pageContext: this.pageContext, report: report, user: user, state: state, confirmit: confirmit, log: log}
     * @param {Number} filterNumber
     * @returns {Boolean}
     */
    static function lstFilterList_Hide(context, filterNumber){
        var filterQuestion = _filterComponents.GetFilterQuestion(filterNumber-1);
        return !filterQuestion
    }
}