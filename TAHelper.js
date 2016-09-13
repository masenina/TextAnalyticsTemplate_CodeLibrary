/**
 * @class TAHelper
 * @classdesc Class cntaining additional static functions to work with text analytics
 */
class TAHelper{
    /**
     * @memberof TAHelper
     * @function GetGlobals
     * @description function to retrieve global parameters from given context
     * @param {Object} context
     * @returns {Object}
     */
    static function GetGlobals(context){
        return {
            pageContext: context.pageContext,
            report: context.report,
            user: context.user,
            state: context.state,
            confirmit: context.confirmit,
            log: context.log
        };
    }

    /**
     * @memberof TAHelper
     * @function GetSelectedCategory
     * @description function to get id of selected category, subcategory or attribute
     * @param {ReportState} state
     * @param {String} categoriesParameterName
     * @param {String} subCategoriesParameterName
     * @param {String} attribtesPararmeterNam
     * @returns {String}
     */
    static function GetSelectedCategory(state, categoriesParameterName, subCategoriesParameterName, attribtesPararmeterName){
        var categoriesParameter;
        if(categoriesParameterName)
            categoriesParameter = state.Parameters.GetString(categoriesParameterName);


        var subCategoriesParameter;
        if(subCategoriesParameterName)
            subCategoriesParameter= state.Parameters.GetString("TA_SUB_CATEGORIES_SINGLE");


        var attributesParameter;
        if(attribtesPararmeterName)
            attributesParameter = state.Parameters.GetString("TA_ATTRIBUTES_SINGLE");

        var selectedCategory = false;

        if(categoriesParameter && categoriesParameter != "emptyv"){
            selectedCategory = categoriesParameter;
        }

        if(subCategoriesParameter && subCategoriesParameter != "emptyv"){
            selectedCategory = subCategoriesParameter;
        }

        if(attributesParameter && attributesParameter != "emptyv"){
            selectedCategory = attributesParameter;
        }

        return selectedCategory;
    }

    /**
     * @memberof TAHelper
     * @function GetSelfName
     * @description function to trim out parents cateories from the category name
     * @param {String} name
     * @param {String} separator
     * @returns {String}
     */
    static function GetSelfName(name, separator){
        var index = name.lastIndexOf(separator);
        return name.slice((index+1)).Trim();
    }

    /**
     * @memberof TAHelper
     * @function GetConfiguredVariables
     * @description function to get configured value from TAConfig or survey tags
     * @param {Object} globals
     * @param {Object} questionConfig
     * @param {Object} config
     * @param {Object} tag
     * @param {Object} defaultValue
     * @returns {Object}
     */
    static function GetConfiguredVariables(globals,questionConfig, config, tag, defaultValue){
    globals.log.LogDebug("GetConfiguredVariables1");
        var result = [];
    globals.log.LogDebug("GetConfiguredVariables2");
        if(!questionConfig || questionConfig.length == 0){
            globals.log.LogDebug("GetConfiguredVariables3");
            if( !config || config.length == 0){
                globals.log.LogDebug("GetConfiguredVariables4");
                if(!tag || tag.length == 0){
                    globals.log.LogDebug("GetConfiguredVariables5");
                    result = defaultValue;
                    globals.log.LogDebug("GetConfiguredVariables61");
                }else{
                    globals.log.LogDebug("GetConfiguredVariables7");
                    result = tag
                    globals.log.LogDebug("GetConfiguredVariables8");
                }
            }else{
                globals.log.LogDebug("GetConfiguredVariables9");
                result = config;
                globals.log.LogDebug("GetConfiguredVariables10");
            }
        }else{
            globals.log.LogDebug("GetConfiguredVariables11");
            result = questionConfig
            globals.log.LogDebug("GetConfiguredVariables12");
        }
    globals.log.LogDebug("GetConfiguredVariables13"+result.length);
        return result;
    globals.log.LogDebug("GetConfiguredVariables14");
    }

    static function GetTagsFromSurvey(globals, datasourceId, tags){
        var result = [];
        var project = globals.report.DataSource.GetProject(datasourceId);
        var questions = project.GetQuestionsWithAnswers(false, tags);
        for (var i = 0; i < questions.length; i++){
            result.push(questions[i].QuestionId);
        }
        return result;
    }

    /**
     * @memberof TAHelper
     * @function SetLastVisitedPage
     * @description function to set the last visited page to the parameter
     * @param {Object} globals
     * @param {String} pageId
     */
    static function SetLastVisitedPage(globals, pageId){
        globals.state.Parameters["TA_LAST_VISITED_PAGE"] = new ParameterValueResponse(pageId);
    }
}