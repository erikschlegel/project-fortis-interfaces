export const editSite = `mutation EditSite($input: EditableSiteSettings!) {
  editSite(input: $input) {
    name
  }
}`;

export const saveTopics = `mutation SaveTopics($input: MutatedTerms) {
  addKeywords(input: $input) {
    ...TopicsView
  }
}`;

export const removeTopics = `mutation RemoveTopics($input: MutatedTerms) {
  removeKeywords(input: $input) {
    ...TopicsView
  }
}`;

export const saveTrustedSources = `mutation SaveTrustedSources($input: SourceListInput!) {
  modifyTrustedSources(input: $input) {
    ...TrustedSourcesView
  }
}`;

export const removeTrustedSources = `mutation RemoveTrustedSources($input: SourceListInput!) {
  removeTrustedSources(input: $input) {
    ...TrustedSourcesView
  }
}`;

export const saveBlacklists = `mutation SaveBlacklists($input: BlacklistTermDefintion!) {
  modifyBlacklist(input: $input) {
    ...BlacklistView
  }
}`;

export const removeBlacklists = `mutation RemoveBlacklists($input: BlacklistTermDefintion!) {
  removeBlacklist(input: $input) {
    ...BlacklistView
  }
}`;

export const saveStreams = `mutation SaveStreams($input: StreamListInput!) {
  modifyStreams(input: $input) {
    ...StreamsView
  }
}`;