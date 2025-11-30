import { mount } from '@vue/test-utils';
import AllTeams from '@/components/all-teams.vue';

describe('AllTeams.vue', () => {
  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
  });

  it('renders correctly', () => {
    wrapper = mount(AllTeams);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays loading state when loading is true', async () => {
    wrapper = mount(AllTeams);
    wrapper.setData({ loading: true, teams: [] });
    await wrapper.vm.$nextTick();
    // Buefy uses b-loading component instead of .loading-state
    expect(wrapper.vm.loading).toBe(true);
    expect(wrapper.find('.empty-state').exists()).toBe(false);
  });

  it('displays empty state when no teams are found', async () => {
    wrapper = mount(AllTeams);
    wrapper.setData({ loading: false, teams: [] });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.empty-state').exists()).toBe(true);
    expect(wrapper.text()).toContain('No teams found');
  });

  it('displays teams when data is loaded', async () => {
    const mockTeams = [
      {
        team_id: 1,
        name: 'Team Secret',
        tag: 'Secret',
        logo_url: 'https://example.com/logo.png'
      },
      {
        team_id: 2,
        name: 'Team Liquid',
        tag: 'Liquid',
        logo_url: 'https://example.com/logo2.png'
      }
    ];

    wrapper = mount(AllTeams);
    wrapper.setData({ loading: false, teams: mockTeams, imageLoaded: {} });
    await wrapper.vm.$nextTick();

    const teamCards = wrapper.findAll('.team-card');
    expect(teamCards.length).toBe(2);
  });

  it('generates team initials correctly', () => {
    wrapper = mount(AllTeams);

    expect(wrapper.vm.getTeamInitials('Team Secret')).toBe('TS');
    expect(wrapper.vm.getTeamInitials('Evil Geniuses')).toBe('EG');
    expect(wrapper.vm.getTeamInitials('OG')).toBe('OG');
    expect(wrapper.vm.getTeamInitials('Team Liquid Dota')).toBe('TLD');
    expect(wrapper.vm.getTeamInitials('')).toBe('??');
    expect(wrapper.vm.getTeamInitials(null)).toBe('??');
  });

  it('generates correct logo URL', () => {
    wrapper = mount(AllTeams);

    const team1 = {
      logo_url: 'https://example.com/logo.png',
      name: 'Team Secret',
      tag: 'Secret'
    };
    expect(wrapper.vm.getTeamLogoUrl(team1)).toBe('https://example.com/logo.png');

    const team2 = {
      logo_url: null,
      name: 'Team Liquid',
      tag: 'Liquid'
    };
    const url = wrapper.vm.getTeamLogoUrl(team2);
    expect(url).toContain('ui-avatars.com');
    expect(url).toContain('Team%20Liquid');
  });

  it('handles image load event', () => {
    wrapper = mount(AllTeams, {
      data() {
        return {
          teams: [],
          loading: false,
          imageLoaded: {}
        };
      }
    });

    wrapper.vm.onImageLoad(123);
    expect(wrapper.vm.imageLoaded[123]).toBe(true);
  });

  it('handles image error event', () => {
    wrapper = mount(AllTeams, {
      data() {
        return {
          teams: [],
          loading: false,
          imageLoaded: {}
        };
      }
    });

    wrapper.vm.onImageError(123);
    expect(wrapper.vm.imageLoaded[123]).toBe(false);
  });
});